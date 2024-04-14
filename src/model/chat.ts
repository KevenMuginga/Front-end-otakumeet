import { Estado } from "./estado";
import { Mensagem } from "./mensagem";
import { Personagem } from "./personagem";

export interface Grupo{
    id: number;
    nome: string;
    primeiraPersonagemId: number;
    primeiraPersonagem: Personagem;
    segundaPersonagemId: number;
    segundaPersonagem: Personagem;
    estado: Estado;
    mensagens: Mensagem[];
}