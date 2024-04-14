import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  api = `${environment.api}${"Usuario"}`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.api);
  }

  getById(id: number): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.api}/${id}`);
  }

  post(post: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.api}`, post);
  }
  put(id: number){
    return this.httpClient.delete(`${this.api}/id`);
  }
}
