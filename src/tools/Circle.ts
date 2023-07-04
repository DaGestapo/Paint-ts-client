import Figure from "./Figure";

export default class Circle extends Figure {

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.toolName = 'circle';
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
                     type: 'circle',
                     x: this.startX,
                     y: this.startY,
                     w: this.currentX,
                     h: this.currentY
                 },
             }));
    }

    public staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const nextImg = this.createImg();
        const radius = this.getRadius(w);

        ctx.drawImage(nextImg, 0, 0, 600, 400);
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const nextImg = this.createImg();

        const radius = this.getRadius(w);
        ctx.clearRect(0, 0, 600, 400);
        ctx.drawImage(nextImg, 0, 0, 600, 400);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    
    }

    private getRadius(w: number): number {
        return  w > 0? w: w < 0? w * - 1: w = 0;
    }
}