import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Comentario } from '../../model/comentario';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Estrela } from '../../model/estrela';
import { Post } from '../../model/post';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  api = `${environment.api}${"Comentario"}`;

  constructor(private httpClient: HttpClient) { }

  getAll(id: number): Observable<Comentario[]>{
    return this.httpClient.get<Comentario[]>(`${this.api}/${id}`);
  }

  post(comentario: Comentario): Observable<Comentario>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    comentario.personagemId = token.unique_name
    return this.httpClient.post<Comentario>(`${this.api}`, comentario);
  }

  
}
