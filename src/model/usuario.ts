import { Estado } from "./estado";
import { Personagem } from "./personagem";

export interface Usuario{
    id: number;
    nome: string;
    senha: string;
    personagemId: number;
    personagem: Personagem;
    estado: Estado;
}