import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../../model/anime';
import { Login } from '../../model/login';
import { Personagem } from '../../model/personagem';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  api = `${environment.api}${'Login'}`;
  token: any;
  connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44367/chat', {
        accessTokenFactory: () => this.token.unique_name,
      })
      .build();

  constructor(private httpClient: HttpClient, private router: Router) {

    if(window.localStorage.getItem('token')){
      this.token = jwtDecode(String(window.localStorage.getItem('token')));

    }
    
  }

  startConnection() {
    this.connection.on('newMessage', (userName: string, message: string) => {
      console.log('messages');
    });

    this.connection.on('newUser', (userName: string) => {
      console.log(userName);
      console.log('conexao');
      console.log(this.connection);
    });
  }

  async login(login: Login) {
    let result = await this.httpClient
      .post<Personagem>(`${this.api}`, login)
      .subscribe({
        next: (res) => {
          window.localStorage.setItem('token', res.token);
          this.startConnection();

          this.router.navigate(['/otakumeet']);
        },
        error: (res) => {
          console.log('erro login');
        },
      });
  }

  myId() {
    const token: any = jwtDecode(String(window.localStorage.getItem('token')));
    console.log("'token.unique_name'");
    console.log(token.unique_name);
    return token.unique_name;
  }

  isLogeded() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
}
