import { Estado } from "./estado";
import { Personagem } from "./personagem";

export interface Anime{
    id: number;
    nome: string;
    autor: string;
    file: File;
    estado: Estado;
    Personagens: Personagem[];
}