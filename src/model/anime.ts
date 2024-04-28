import { Estado } from "./estado";
import { Personagem } from "./personagem";

export interface Anime{
    id: number;
    nome: string;
    autor: string;
    imgUrl: string;
    file: File;
    estado: Estado;
    personagens: Personagem[];
}