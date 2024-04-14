import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../../model/personagem';
import { Follow } from '../../model/follow';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  api = `${environment.api}${"Personagem"}`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Personagem[]>{
    return this.httpClient.get<Personagem[]>(this.api);
  }

  getPersonageWithoutUser(animeId: number): Observable<Personagem[]>{
    return this.httpClient.get<Personagem[]>(`${this.api}/AnimeWithoutUser/${animeId}`);
  }

  getAllByAnime(animeId: number): Observable<Personagem[]>{
    return this.httpClient.get<Personagem[]>(`${this.api}/Anime/${animeId}`);
  }

  getFollowing(userId: number): Observable<Personagem[]>{
    return this.httpClient.get<Personagem[]>(`${this.api}/Anime/${userId}`);
  }

  getImFollowing(): Observable<Personagem[]>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    return this.httpClient.get<Personagem[]>(`${this.api}/Following/${token.unique_name}`);
  }


  getById(id: number): Observable<Personagem>{
    return this.httpClient.get<Personagem>(`${this.api}/${id}`);
  }

  getAllUnfollowing(): Observable<Personagem[]>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    return this.httpClient.get<Personagem[]>(`${this.api}/UnFollowing/${token.unique_name}`);
  }

  my(): Observable<Personagem>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    return this.httpClient.get<Personagem>(`${this.api}/${token.unique_name}`);
  }

  post(personagem: FormData): Observable<Personagem>{
    return this.httpClient.post<Personagem>(`${this.api}`, personagem);
  }

  follow(follow: Follow): Observable<Personagem>{
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));

    follow.myId = token.unique_name;

    return this.httpClient.post<Personagem>(`${this.api}/Follow`, follow);
  }

  put(personagem: FormData): Observable<Personagem>{
    return this.httpClient.put<Personagem>(`${this.api}`, personagem);
  }

  unFollow(personagem: Follow): Observable<Personagem>{
    return this.httpClient.post<Personagem>(`${this.api}/UnFollow`, personagem);
  }
}
