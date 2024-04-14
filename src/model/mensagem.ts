
import { Grupo } from "./chat";
import { Estado } from "./estado";
import { Personagem } from "./personagem";

export interface Mensagem{
    id?: number;
    descricao?: string;
    nome?: string;
    personagemId?: number;
    personagem?: Personagem;
    toGrupoId?: number;
    toGrupo?: Grupo;
    estado?: Estado;
    data?: Date;
}