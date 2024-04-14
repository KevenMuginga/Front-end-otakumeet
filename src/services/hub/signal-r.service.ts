import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Mensagem } from '../../model/mensagem';
import { ConexaoPersonagem } from '../../model/conexaoPersonagem';
import { ConexaoPersonagemService } from '../conexaoPersonagem/conexao-personagem.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44367/chat", { accessTokenFactory: () => String(window.localStorage.getItem('token')) })
    .build();

  constructor(
    private conexaoService: ConexaoPersonagemService,
  ) { }

  startConnection(){

    this.connection.start()
    .then(() => {
      
    })
    .catch(error => {
        console.error("Connection failed: ", error);
    });
  }

  getConetion(){
      console.log(this.connection.connectionId);
    
    return this.connection;
  }

  putConexaoPersonagem(conexaoPersonagem: ConexaoPersonagem){
    this.conexaoService.put(conexaoPersonagem).subscribe({
      next:(res=>{

      }),
      error:(()=>{
        console.log("Erro put ConexaoPersonagem");

      })
    })
  }

}
