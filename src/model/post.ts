import { Comentario } from "./comentario";
import { Estado } from "./estado";
import { Personagem } from "./personagem";

export interface Post{
    id: number;
    descricao: string;
    file: File;
    imgUrl: string;
    estrelas: Personagem[];
    personagemId: number;
    personagem: Personagem;
    estado: Estado;
    comentarios: Comentario[];
}