import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { ConexaoPersonagem } from '../../model/conexaoPersonagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexaoPersonagemService {

  api = `${environment.api}${"ConexaoPersonagem"}`;
  token: any = jwtDecode(String(window.localStorage.getItem('token')));


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ConexaoPersonagem[]>{
    return this.httpClient.get<ConexaoPersonagem[]>(this.api);
  }

  getById(): Observable<ConexaoPersonagem>{
    return this.httpClient.get<ConexaoPersonagem>(this.api);
  }

  post(conexaoPersonagem: ConexaoPersonagem): Observable<ConexaoPersonagem>{
    conexaoPersonagem.personagemId = this.token.unique_name;
    return this.httpClient.post<ConexaoPersonagem>(this.api, conexaoPersonagem);
  }

  put(conexaoPersonagem: ConexaoPersonagem): Observable<ConexaoPersonagem>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    conexaoPersonagem.personagemId = Number(token.unique_name);
    return this.httpClient.put<ConexaoPersonagem>(this.api, conexaoPersonagem);
  }
}
