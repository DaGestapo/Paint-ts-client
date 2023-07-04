import  Brush  from "./Brush";

export default class Eraser extends Brush {
    private saved: string | CanvasGradient | CanvasPattern;
    private color: string;

    constructor(canvas : HTMLCanvasElement, socket: WebSocket, ctx: CanvasRenderingContext2D, id: string) {
        super(canvas, socket, ctx, id);
        this.saved = this.ctx.strokeStyle;
        this.toolName = 'eraser';
        this.color = '#fff';
    }

    protected pointerMoveHandler(e: PointerEvent) {
        super.pointerMoveHandler(e);
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx.strokeStyle = this.color;
        super.draw(ctx, x, y);
        this.ctx.strokeStyle = this.saved
    
    }
}