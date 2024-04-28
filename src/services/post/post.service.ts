import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { jwtDecode } from 'jwt-decode';
import { Estrela } from '../../model/estrela';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  api = `${environment.api}${"Post"}`;
  token: any = jwtDecode(String(window.localStorage.getItem('token')));

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.api);
  }

  GetByAllOfPersonagem(id: number): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.api}/Personagem/${id}`);
  }

  GetAllPostOfPersonagesFollowingAsync(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.api}/PersonaFollowing/${this.token.unique_name}`);
  }

  search(keyword: string): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.api}/All/${keyword}`);
  }


  getById(id: number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.api}/${id}`);
  }

  post(post: FormData): Observable<Post>{
    post.append('personagemID', this.token.unique_name);
    return this.httpClient.post<Post>(`${this.api}`, post);
  }
  put(post: FormData): Observable<Post>{
    return this.httpClient.put<Post>(`${this.api}`, post);
  }

  addEstrela(estrela: Estrela): Observable<Post>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    estrela.myId = token.unique_name
    return this.httpClient.post<Post>(`${this.api}/AddEstrela`, estrela);
  }
}
