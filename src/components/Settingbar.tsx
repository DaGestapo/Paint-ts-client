import { ChangeEvent, FC } from "react";
import '../styles/bars.scss';
import toolState from '../store/toolState';
import canvasState from "../store/canvasState";

const Settingbar: FC = () => {


    const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
        const width = Number(e.target.value);
        if(typeof(width) !== 'number') return;
        toolState.setLineWidth(width);

        canvasState.socket?.send(JSON.stringify({
            id: canvasState.id,
            method: 'setting',
            option: {
                type: 'width',
                width: width
            }
        }));


    }
    return (
        <div className="setting bar">
            <div className="setting__thick">
                <p>Толщина линии: </p>
                <input 
                    type="text" 
                    onChange={changeLineWidth}
                    />
            </div>
        </div>
    )
}

export default Settingbar;