import {MessageDrawI} from '../../model/messagesI';
import { Brush, Circle, Eraser, Rect, Line } from '../../tools/ToolsRouter';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';



export const drawHandler = (msg: MessageDrawI) => {
    const [canvas, ctx, socket, id] = [
        canvasState.canvas, 
        canvasState.ctx, 
        canvasState.socket, 
        canvasState.id
    ];

    if(!id || !ctx || !canvas || !socket) return;
    if(!toolState.tool) return;
    

    const figure = msg.figure;

    let [tool, toolName] = [
        toolState.tool,
        toolState.tool.getToolName
    ];

    tool.savedCanvas = canvas.toDataURL();

    switch (figure.type) {
        case 'brush':
            if(toolName === 'brush' && tool instanceof Brush) {
                tool.draw(ctx, figure.x, figure.y);
            } else {
                tool = new Brush(canvas, socket, ctx, id);
                if(tool instanceof Brush) {
                    tool.draw(ctx, figure.x, figure.y);
                }
            }
            break;

      
            
        case 'eraser':
            if(toolName === 'eraser' && tool instanceof Brush) {
                tool.draw(ctx, figure.x, figure.y);
            } else {
                tool = new Eraser(canvas, socket, ctx, id);
                if(tool instanceof Eraser){
                    tool.draw(ctx, figure.x, figure.y);
                }
            }
            break;

        case 'rect':
            if(!figure.w || !figure.h) return;
            if(toolName === 'rect' && tool instanceof Rect) {
                tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
            } else {
                tool = new Rect(canvas, socket, ctx, id);
                if(tool instanceof Rect) {
                    tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
                }
            }
            break;

        case 'circle':
            if(!figure.w || !figure.h) return;
            if(toolName === 'circle' && tool instanceof Circle) {
                tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
            } else {
                tool = new Circle(canvas, socket, ctx, id);
                if(tool instanceof Circle) {
                    tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
                }
            }
            break;

        case 'line':
            if(!figure.w || !figure.h) return;
            if(toolName === 'line' && tool instanceof Line) {
                tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
            } else {
                tool = new Line(canvas, socket, ctx, id);
                if(tool instanceof Line) {
                    tool.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h);
                }
            }
            break;

        default:
            break;
    }

}  


