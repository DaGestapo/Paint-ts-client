export interface figureI {
    type: string;
    x: number;
    y: number;
    w?: number;
    h?: number;
}

export interface OptionI {
    type: string;
    color?: string;
    width?: number;
}

export interface MessageFinishI {
    id: string;
    method: string;
    img: string;
}

export interface MessageDrawI {
    id: number;
    method: string;
    figure: figureI;
}


export interface MessageSettingI {
    id: number;
    method: string;
    option : OptionI;
}

export interface MessageConnectionI {
    id: string;
    method: string,
    username: string
}

export interface StoreI {
    id: string,
    method: string,
    type: string
}
