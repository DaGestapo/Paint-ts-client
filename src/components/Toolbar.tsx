import { FC, ChangeEvent} from "react";
import '../styles/bars.scss';

import { Brush, Eraser, Rect, Circle, Line } from "../tools/ToolsRouter";

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

interface ToolbarI {
    id: string;
}


const Toolbar: FC<ToolbarI> = ({id}) => {

    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        toolState.setStyleColor(e.target.value);
        toolState.setFillColor(e.target.value);

        canvasState.socket?.send(JSON.stringify({
            id: id,
            method: 'setting',
            option: {
                type: 'color',
                color: e.target.value
            }
        }));
    }

   const changeTool = (selectedTool: string) => {
        if( !canvasState.canvas || !canvasState.socket || !canvasState.ctx) return;
        
        switch (selectedTool) {
            case 'brush':
                toolState.setTool( new Brush(
                    canvasState.canvas, 
                    canvasState.socket, 
                    canvasState.ctx, 
                    id) );
                break;

            case 'rect':
                toolState.setTool( new Rect(
                    canvasState.canvas,  
                    canvasState.socket, 
                    canvasState.ctx, 
                    id) );
                break;

            case 'circle':
                toolState.setTool( new Circle(
                    canvasState.canvas,  
                    canvasState.socket, 
                    canvasState.ctx, 
                    id) );
                break;
            
            case 'eraser':
                toolState.setTool( new Eraser(
                    canvasState.canvas,  
                    canvasState.socket, 
                    canvasState.ctx, 
                    id) );
                break;

            case 'line':
                toolState.setTool( new Line(
                    canvasState.canvas, 
                    canvasState.socket,
                    canvasState.ctx, 
                    id) );
                break;
            
            default:
                break;
        }
       
        }

    const downloadImg = () => {
        if( !canvasState.canvas) return;
        const el = document.createElement('a');
        el.href = canvasState.canvas.toDataURL();
        el.download = 'img';
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

      return (
        <div className="tool bar">
            <button 
                className="brush" 
                onClick={() => changeTool('brush')}
            />
            <button 
                className="rect" 
                onClick={() => changeTool('rect')}
                />
            <button 
                className="circle"
                onClick={() => changeTool('circle')}
                />
            <button 
                className="eraser" 
                onClick={() => changeTool('eraser')}
                />
            <button 
                className="line" 
                onClick={() => changeTool('line')}
                />
            <input 
                type="color" 
                onChange={changeColor}
            />
            <button 
                className="undo" 
                onClick={() => canvasState.undo()}
                />
            <button 
                className="redo"
                onClick={() => canvasState.redo()}
                />
            <button 
                className="save"
                onClick={() => downloadImg()}
                />
        </div>
    )
}

export default Toolbar;