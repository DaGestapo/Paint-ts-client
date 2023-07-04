import Tool from "./Tool";

export default class Brush extends Tool {
    protected mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.toolName = 'brush';
        this.mouseDown = false;
        this.listen();
    }

    protected pointerdownHandler(e: PointerEvent): void {
        this.ctx.beginPath();
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
            this.currentX = e.pageX - this.canvas.offsetLeft;
            this.currentY = e.pageY - this.canvas.offsetTop;
            this.socket.send(JSON.stringify({
                id: this.id,
                method: 'draw',
                figure: {
                    type: this.toolName === 'brush'? 'brush' : 'eraser',
                    x: this.currentX,
                    y: this.currentY
                }
            }));
        }
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    private listen() {
        this.canvas.onpointerdown = this.pointerdownHandler.bind(this);
        this.canvas.onpointermove = this.pointerMoveHandler.bind(this);
        this.canvas.onpointerup = this.pointerUpHandler.bind(this);
    }
}
