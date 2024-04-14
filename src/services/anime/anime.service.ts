import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Anime } from '../../model/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  api = `${environment.api}${"Anime"}`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Anime[]>{
    return this.httpClient.get<Anime[]>(this.api);
  }

  getById(id: number): Observable<Anime>{
    return this.httpClient.get<Anime>(`${this.api}/${id}`);
  }

  post(anime: FormData): Observable<Anime>{
    return this.httpClient.post<Anime>(`${this.api}`, anime);
  }
  put(anime: FormData): Observable<Anime>{
    return this.httpClient.put<Anime>(`${this.api}`, anime);
  }
}
