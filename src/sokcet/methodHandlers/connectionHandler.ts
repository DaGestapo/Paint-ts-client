import { MessageConnectionI } from '../../model/messagesI';
import canvasState from '../../store/canvasState';

export const connectionHandler = (msg: MessageConnectionI) => {
        const savedCanvas = localStorage.getItem(msg.id);
        const ctx = canvasState.ctx;

        if(savedCanvas && ctx) {
            const src: string = JSON.parse(savedCanvas).current;
            const img = document.createElement('img');
            img.src = src;

            setTimeout(() => {
                ctx.drawImage(img, 0, 0, 600, 400);
            }, 0);
        }
}