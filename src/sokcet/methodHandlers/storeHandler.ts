import { StoreI } from '../../model/messagesI'; 
import canvasState from '../../store/canvasState';

export const storeHandler = (msg: StoreI) => {

    switch (msg.type) {
        case 'undo':
            undoHandler(msg.id);
            break;

        case 'redo': 
            redoHandler(msg.id);
            break;

        default:
            break;
    }
}

export function redoHandler(id: string) {
    if(!canvasState.socket) return;
    const lockStore = localStorage.getItem(id);
    if(!lockStore) return;

    const current: string = JSON.parse(lockStore).current;

    if(!current) return;
    
    const img = document.createElement('img');
    img.src = current;
    img.onload = () => {
        if(!canvasState.ctx) return;
        canvasState.ctx.clearRect(0, 0, 600, 400);
        canvasState.ctx.drawImage(img, 0, 0, 600, 400);
        
    }
}


export function undoHandler(id: string) {
    if(!canvasState.socket) return;
    const lockStore = localStorage.getItem(id);
    if(!lockStore) return;

    const current: string = JSON.parse(lockStore).current;
    
    const img = document.createElement('img');
    img.src = current;
    img.onload = () => {
        if(!canvasState.ctx) return;
        canvasState.ctx.clearRect(0, 0, 600, 400);
        canvasState.ctx.drawImage(img, 0, 0, 600, 400);
        
    }
}