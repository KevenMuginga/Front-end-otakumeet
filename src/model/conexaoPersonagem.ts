import { Personagem } from "./personagem";

export interface ConexaoPersonagem{
    id: number;
    personagemId: number;
    personagem: Personagem;
    conexao: string;
}