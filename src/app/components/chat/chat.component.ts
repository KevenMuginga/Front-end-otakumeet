import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr'
import { Mensagem } from '../../../model/mensagem';
import { ConexaoPersonagemService } from '../../../services/conexaoPersonagem/conexao-personagem.service';
import { ConexaoPersonagem } from '../../../model/conexaoPersonagem';
import { MensagemService } from '../../../services/mensagem/mensagem.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { Grupo } from '../../../model/chat';
import { SignalRService } from '../../../services/hub/signal-r.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  
  form!: FormGroup;
  id!: number;

  mensagens: Mensagem[] = [];
  conexaoPersonagem: ConexaoPersonagem = Object.create(null);
  grupo: Grupo = Object.create(null);

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44367/chat", { accessTokenFactory: () => String(window.localStorage.getItem('token')) })
    .build();

    token: any = jwtDecode(String(window.localStorage.getItem('token')));

  constructor(
    private conexaoPersonagemService: ConexaoPersonagemService,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private grupoService: GrupoService,
    private activatedRoute: ActivatedRoute,
    private signalService: SignalRService,
    private router: Router,

  ){
    this.router.events.subscribe(event => {

      // if (event instanceof NavigationStart) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getGrupo();
    this.get();
      // }
  })
  }


  ngOnInit(): void {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')?.toString());
    this.getGrupo();

    this.get();
    
   this.form = this.formBuilder.group({
    descricao: ['', Validators.required],
   })
  }

  startConnection(){
    // this.connection.on("newMessage", res=>{
    //   console.log("mensagem enviada");
    //   console.log(res);

    //    this.mensagens.push(res)
    //  })

     this.connection.on("NewMessage", ( usuario: number, descricao: string, grupo: string)=>{
       console.log("mensagem enviada");
       this.mensagens.push({descricao: descricao, personagemId:usuario});
     })

    

    this.connection.start()
    .then(() => {
      
      this.putConexaoPersonagem();

      this.connection.invoke("AddToGroup2", this.grupo.nome).then(()=>{
        console.log("inside group " + this.grupo.nome);

      }).catch((error:any)=>{
        console.error("join group failed: ", error);

      })
    })
    .catch((error: any) => {
        console.error("Connection failed: ", error);
    });
  }

  get(){
    this.mensagemService.getAllById(this.id).subscribe({
      next:(res=>{
        this.mensagens = res;
        // console.log("success post mensagens");

      }),
      error:(()=>{
        console.log("erro post mensagens");
      })
    })
  }

  onSubmit(){
    let mensagem = this.form.value as Mensagem;
    mensagem.toGrupoId = this.grupo.id;
    mensagem.toGrupo = this.grupo;
    mensagem.personagemId = Number(this.token.unique_name);

    // this.connection.send("newMessage", mensagem).then(()=>{

    this.connection.send("newMessage", this.grupo.nome, Number(this.token.unique_name), this.form.value.descricao).then(()=>{
      this.form.reset();
        this.mensagemService.post(mensagem).subscribe({
          next:(res=>{
           console.log("success get grupo");
  
          }),
          error:(()=>{
            console.log("erro post grupo");
          })
        })
    }).catch((error: any) => {
      console.error("send failed: ", error);
  });
  }

  getGrupo(){
    this.grupoService.getById(this.id).subscribe({
      next:(res=>{
        this.grupo = res;
        this.startConnection();


      }),
      error:(()=>{
        console.log("erro get grupo");
      })
    })
  }

  putConexaoPersonagem(){
     this.conexaoPersonagem.conexao = String(this.connection.connectionId);
     this.conexaoPersonagemService.put(this.conexaoPersonagem).subscribe({
       next:(res=>{
        // console.log(this.conexaoPersonagem)
       }),
       error:(()=>{
         console.log("Erro put ConexaoPersonagem");

       })
     })
  }

}
