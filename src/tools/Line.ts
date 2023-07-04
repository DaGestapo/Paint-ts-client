import  Figure  from "./Figure";

export default class Line extends Figure {

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.toolName = 'line';
    }

    protected pointerMoveHandler(e: PointerEvent) {
        super.pointerMoveHandler(e);

        if(this.mouseDown) {
            this.draw(this.ctx, this.startX, this.startY, this.currentX, this.currentY);
        }
    }

    protected pointerUpHandler(e: PointerEvent): void {
        super.pointerUpHandler(e);

         this.socket.send(JSON.stringify({
                 id: this.id,
                 method: "draw",
                 figure: {
                     type: 'line',
                     x: this.startX,
                     y: this.startY,
                     w: this.currentX,
                     h: this.currentY
                 },
             }));
    }

    public staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const nextImg = this.createImg();
        ctx.drawImage(nextImg, 0, 0, 600, 400);
        ctx.moveTo(x, y);
        ctx.lineTo(w + x, h + y);
        ctx.stroke();
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const nextImg = this.createImg();

        ctx.clearRect(0, 0, 600, 400);
        ctx.drawImage(nextImg, 0, 0, 600, 400);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(w + x, h + y);
        ctx.stroke();
    } 
}