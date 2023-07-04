
export default class Tool {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected socket: WebSocket;
    protected toolName: string;
    protected id: string;
    protected img?: HTMLImageElement;
    protected startX: number = 0;
    protected startY: number = 0;
    protected currentX: number = 0;
    protected currentY: number = 0;
    public savedCanvas: string;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        this.canvas = canvas;
        this.socket = socket;
        this.toolName = 'tool';
        this.id = id;
        this.ctx = ctx;
        this.savedCanvas = this.saveCanvas();
        this.delete();
    }

    get getToolName(): string {
        return this.toolName;
    }

    set fillColor(color: string) {
        if(color.startsWith('#')) {
            this.ctx.fillStyle = color;
        }
    }

    set styleColor(color: string) {
        if(color.startsWith('#')) {
            this.ctx.strokeStyle = color;
        }
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    public saveToLocalStorage(src?: string) {
        const store = localStorage.getItem(this.id)
        ? localStorage.getItem(this.id)
        : null;
        let undoArr: string[] = [];

        if(!src) {
            src = this.saveCanvas();
        }

        if(!store) {
            undoArr.push(src);
        } else {
            undoArr = JSON.parse(store).undo;
            undoArr.push(src);
        }

        localStorage.setItem(this.id, JSON.stringify({
            current: this.saveCanvas(),
            undo: undoArr,
            redo: []
        }));
    }

    protected saveCanvas(): string {
        return this.canvas.toDataURL();
    }

    public setColor(color: string) {
        if(color.startsWith('#')) {
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color;
        }
    }

    private delete() {
        this.canvas.onpointerdown = null;
        this.canvas.onpointermove = null;
        this.canvas.onpointerup = null;
    }
}


export type typedTool = Tool;