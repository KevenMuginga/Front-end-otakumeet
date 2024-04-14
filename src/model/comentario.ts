import { Estado } from "./estado";
import { Personagem } from "./personagem";
import { Post } from "./post";

export interface Comentario{
    id: number;
    descricao: string;
    estrela: Personagem[];
    personagemId: number;
    personagem: Personagem;
    postId: number;
    post: Post;
    estado: Estado;
}