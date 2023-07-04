import {makeAutoObservable} from 'mobx';


class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    socket: WebSocket | null = null
    username: string | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    id: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public checkForExist(): boolean {
        if(!this.id || !this.ctx || !this.canvas || !this.socket) return false;
        return true;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public setWebSocket(socket: WebSocket) {
        this.socket = socket;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    public setId(id: string) {
        this.id = id;
    }

    public undo() {
        if(!this.id || !this.socket || !this.canvas) return;
        const undoRedoArr = this.getCanvasSorages(this.id);

        if(undoRedoArr) {
            const prevSrc = undoRedoArr[0].pop();
            const currSrc = this.canvas.toDataURL();
            if(!prevSrc || !currSrc) return;

            undoRedoArr[1].push(currSrc);

            localStorage.setItem(this.id, JSON.stringify({
                current: prevSrc,
                undo: undoRedoArr[0],
                redo: undoRedoArr[1]
            }));

            this.socket.send(JSON.stringify({
                id: this.id,
                method: 'store',
                type: 'undo'
            }))
        }
    }

    public redo() {
        if(!this.id || !this.socket || !this.canvas) return;
        const undoRedoArr = this.getCanvasSorages(this.id);

        if(undoRedoArr) {
            const prevSrc = undoRedoArr[1].pop();
            const currSrc = this.canvas.toDataURL();
            if(!prevSrc || !currSrc) return;

            undoRedoArr[0].push(currSrc);

            localStorage.setItem(this.id, JSON.stringify({
                current: prevSrc,
                undo: undoRedoArr[0],
                redo: undoRedoArr[1]
            }));

            this.socket.send(JSON.stringify({
                id: this.id,
                method: 'store',
                type: 'redo'
            }))
        }
    }

    private getCanvasSorages(id: string): Array<Array<string>> | null {
        const lockalStore = localStorage.getItem(id);
        if(!lockalStore) return null;

        const undoArr: string[] = JSON.parse(lockalStore).undo;
        const redoArr: string[] = JSON.parse(lockalStore).redo;

        return [undoArr, redoArr];
    }

}

export default new CanvasState();