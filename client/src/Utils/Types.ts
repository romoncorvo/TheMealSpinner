import { Dispatch, SetStateAction } from "react";

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

export interface LoginAndRegisterRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    userName: string;
    token: string;
}



export type SetValue<T> = Dispatch<SetStateAction<T>>