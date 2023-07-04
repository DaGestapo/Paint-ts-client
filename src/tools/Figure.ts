import Tool from "./Tool";

export default class Figure extends Tool {
    protected mouseDown: boolean;
    protected img: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.mouseDown = false; 
        this.toolName = 'figure';
        this.img = this.createImg();
        this.listen()
    }

    protected pointerdownHandler(e: PointerEvent): void {
        this.startX = e.pageX - this.canvas.offsetLeft;
        this.startY = e.pageY - this.canvas.offsetTop;

        this.savedCanvas = this.canvas.toDataURL();
        this.mouseDown = true;

        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'finish'
        }));

        this.saveToLocalStorage(this.savedCanvas);
    }

    protected pointerUpHandler(e: PointerEvent) {
        this.mouseDown = false;
    }

    protected pointerMoveHandler(e: PointerEvent) {
        if(this.mouseDown) {
            this.currentX = e.pageX - this.canvas.offsetLeft - this.startX;
            this.currentY = e.pageY - this.canvas.offsetTop - this.startY;    
        }
    }


    protected createImg(): HTMLImageElement {
        const img = document.createElement('img');
        img.src = this.savedCanvas; 
        return img;
    }

    protected listen() {
        this.canvas.onpointerdown = this.pointerdownHandler.bind(this);
        this.canvas.onpointermove = this.pointerMoveHandler.bind(this);
        this.canvas.onpointerup = this.pointerUpHandler.bind(this);
    }
}