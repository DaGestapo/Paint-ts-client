import { FC, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import '../styles/canvas.scss';

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

import { Brush } from "../tools/ToolsRouter";
import { setSocketListener } from "../sokcet/socket";

interface CanvasI {
    
}

const Canvas: FC<CanvasI> = observer(() => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    useEffect( () => {
        if(!canvasRef.current) return;


        canvasState.setCanvas(canvasRef.current);
        const [socket, ctx, id] = [
            canvasState.socket, 
            canvasState.ctx, 
            canvasState.id
        ];

        if(!socket || !ctx || !id) return;

        toolState.setTool(new Brush(canvasRef.current, socket, ctx, id));
        setSocketListener(socket);

    }, [canvasState.username]);

    return (
        <div className="canvas">
            <canvas 
                width={600} 
                height={400}
                ref={canvasRef}
            />
        </div>
    )
});

export default Canvas;