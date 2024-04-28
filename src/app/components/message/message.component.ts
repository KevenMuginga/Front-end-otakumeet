import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Personagem } from '../../../model/personagem';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { CommonModule } from '@angular/common';
import { Route, RouterLink } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { ConexaoPersonagemService } from '../../../services/conexaoPersonagem/conexao-personagem.service';
import { ConexaoPersonagem } from '../../../model/conexaoPersonagem';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { Grupo } from '../../../model/chat';
import { Follow } from '../../../model/follow';
import { SignalRService } from '../../../services/hub/signal-r.service';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, RouterLink, PerfilComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnChanges{

  @Output() conexao = new EventEmitter;
  @Output() followUser = new EventEmitter;
  @Input() unfollowed!: number;

  grupos: Grupo[] = [];
  gruposFilter: Grupo[] = [];
  personagens: Personagem[] = [];
  seguindo: Personagem[] = [];
  follow: Follow = Object.create(null);
  myPersonagem:Personagem = Object.create(null);

  conexaoPersonagem: ConexaoPersonagem = Object.create(null);
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44367/chat", { accessTokenFactory: () => String(window.localStorage.getItem('token')) })
    .build();

  constructor(
    private personagemService: PersonagemService,
    private conexaoPersonagemService: ConexaoPersonagemService,
    private grupoService: GrupoService,
    private signalService: SignalRService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('input value changed')
    this.get();
    this.getAllUnFollowing()
  }

  ngOnInit(): void {
    this.getMyPersonagem();
    this.getAllUnFollowing();
    this.get();
  }

  get(){
    this.grupoService.getAllById().subscribe({
      next:(res=>{
        this.grupos = res;
        this.gruposFilter = res;
      }),
      error:(()=>{
        console.log('erro')
      })
    })
  }

  getMyPersonagem(){
    this.personagemService.my().subscribe({
      next:(res=>{
        this.myPersonagem = res;
      }),
      error:(()=>{
        console.log('erro')
      })
    })
  }

  getAllUnFollowing(){
    this.personagemService.getAllUnfollowing().subscribe({
      next:(res=>{
        this.personagens = res;
      }),
      error:(()=>{
        console.log('erro')
      })
    })
  }

  getFollows(){
    this.personagemService.getImFollowing().subscribe({
      next:(res=>{
        this.seguindo = res;
      }),
      error:(()=>{
        console.log('erro')
      })
    })
  }

  seguir(iduser: number){
    this.follow.personagemId = iduser;
    this.personagemService.follow(this.follow).subscribe({
      next:(res=>{
        this.followUser.emit("");
        this.get();
        this.getAllUnFollowing()
      }),
      error:(()=>{
        console.log('erro')
      })
    })
  }

   startConnection(){

     this.connection.start()
     .then(() => {

       this.conexao.emit(this.connection)

       this.putConexaoPersonagem();


     })
     .catch((error:any) => {
         console.error("Connection failed: ", error);
     });
   }

  putConexaoPersonagem(){
    console.log(this.connection);
    console.log(this.connection.connectionId);

     this.conexaoPersonagem.conexao = String(this.connection.connectionId);
     this.conexaoPersonagemService.put(this.conexaoPersonagem).subscribe({
       next:(res=>{
         

       }),
       error:(()=>{
         console.log("Erro Post ConexaoPersonagem");

       })
     })
  }

  search(event: any){

    this.gruposFilter = this.grupos.filter(g =>{
      return g.nome.includes(event.target.value) ||
      g.primeiraPersonagem.nome.includes(event.target.value) ||
      g.segundaPersonagem.nome.includes(event.target.value)
    })
  }

}
