import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../../model/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  api = `${environment.api}${"Chat"}`;
  token: any = jwtDecode(String(window.localStorage.getItem('token')));

  constructor(private httpClient: HttpClient) { }

  getAllById(): Observable<Grupo[]>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    return this.httpClient.get<Grupo[]>(`${this.api}/Personagem/${token.unique_name}`);
  }

  getAllByChat(grupo: Grupo): Observable<Grupo[]>{
    return this.httpClient.get<Grupo[]>(`${this.api}/grupo`);
  }

  getById(id: number): Observable<Grupo>{
    return this.httpClient.get<Grupo>(`${this.api}/${id}`);
  }

  post(grupo: Grupo): Observable<Grupo>{
    return this.httpClient.post<Grupo>(`${this.api}`, grupo);
  }
}