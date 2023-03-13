export interface Instruction {
    text: string;
}

export interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    instructions: Instruction[];
    times: string[];
    image: string;
}