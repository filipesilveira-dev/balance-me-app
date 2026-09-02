export interface Item{
    id: string;
    type: "obligation" | "leisure";
    name: string;
    intensity: number;
}

export interface NewItem{
    type: "obligation" | "leisure";
    name: string;
    intensity: number;
}