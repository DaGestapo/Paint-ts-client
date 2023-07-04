import canvasState from '../store/canvasState';
import toolState from '../store/toolState';

import { drawHandler } from './methodHandlers/drawHandler';
import { settingsHandler } from './methodHandlers/settingsHandler';
import { connectionHandler } from './methodHandlers/connectionHandler';
import { storeHandler } from './methodHandlers/storeHandler';

export const setSocketListener = (socket: WebSocket) => {
    socket.onmessage = (msg) => {
        const parsedMsg = JSON.parse(msg.data);
        if(!toolState.tool || !canvasState.ctx || !canvasState.id) return;
        switch (parsedMsg.method) {

            case 'connection': 
                connectionHandler(parsedMsg);
                break;

            case 'draw':
                drawHandler(parsedMsg);
                break;

            case 'store':
                storeHandler(parsedMsg);
                break;

            case 'setting': 
                settingsHandler(parsedMsg);
                break;
    
            case 'finish':
                canvasState.ctx.beginPath();
                break;
        
            default:
                break;
        }
    }
} 

