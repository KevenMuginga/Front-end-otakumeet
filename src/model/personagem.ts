import { Anime } from "./anime";
import { Estado } from "./estado";
import { Post } from "./post";
import { Usuario } from "./usuario";

export interface Personagem{
    id: number;
    nome: string;
    token: string;
    imgUrl: string;
    animeId: string;
    anime: Anime;
    usuario: Usuario;
    estado: Estado;
    aSeguir: Personagem[];
    seguidores: Personagem[];
    posts: Post[];
}