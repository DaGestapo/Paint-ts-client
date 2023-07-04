import Figure  from "./Figure";

export default class Rect extends Figure {

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.toolName = 'rect';
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
                     type: 'rect',
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
        ctx.fillRect(x, y, w, h);
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const nextImg = this.createImg();

        ctx.clearRect(0, 0, 600, 400);
        ctx.drawImage(nextImg, 0, 0, 600, 400);

        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
    
    }
}