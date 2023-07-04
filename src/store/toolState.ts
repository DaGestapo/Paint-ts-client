import {makeAutoObservable} from 'mobx';
import  {Tool} from '../tools/ToolsRouter';

class ToolState {
    public tool: Tool | null = null;
    public color: string = '#000';
    public width : number = 1;
    constructor() {
        makeAutoObservable(this);
    }

    public setTool(tool : Tool): void {
        this.tool = tool;
    }

    public setFillColor(color: string): void {
        if(!this.tool) return;
        this.tool.fillColor = color;
    }

    public setStyleColor(color: string) {
        if(!this.tool) return;
        this.tool.styleColor = color;
    }

    public setLineWidth(width: number) {
        if(!this.tool) return;
        this.width = width;
        this.tool.lineWidth = width;
    }
}

export default new ToolState();
