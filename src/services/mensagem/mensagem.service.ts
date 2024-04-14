import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../../model/mensagem';
import { Grupo } from '../../model/chat';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  api = `${environment.api}${"Mensagem"}`;

  constructor(private httpClient: HttpClient) { }

  getAllById(id: number): Observable<Mensagem[]>{
    return this.httpClient.get<Mensagem[]>(`${this.api}/${id}`);
  }

  getAllByChat(grupo: Grupo): Observable<Mensagem[]>{
    return this.httpClient.get<Mensagem[]>(`${this.api}/grupo`);
  }

  post(mensagem: Mensagem): Observable<Mensagem>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    mensagem.personagemId = token.unique_name;
    return this.httpClient.post<Mensagem>(`${this.api}`, mensagem);
  }
}
