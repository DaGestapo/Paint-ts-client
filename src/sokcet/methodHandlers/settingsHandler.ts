import toolState from '../../store/toolState';
import { MessageSettingI } from '../../model/messagesI';

export const settingsHandler = (msg: MessageSettingI) => {
    const options = msg.option;

    switch (options.type) {
        case 'color':   
            if(!options.color) return;
            toolState.setStyleColor(options.color);
            toolState.setFillColor(options.color);
            break;

        case 'width':   
            if(!options.width) return;
            toolState.setLineWidth(options.width);
        break;
    
        default:
            break;
    }
}