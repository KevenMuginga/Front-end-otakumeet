import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  myPersonagem: Personagem = Object.create(null);

  constructor(
    private personagemService: PersonagemService,
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.getMy()
  }

  getMy(){
    this.personagemService.my().subscribe({
      next:(res=>{
        this.myPersonagem = res;
      }),
      error:(()=>{
        console.log("erro");
      })
    })
  }

  logout(){
    this.loginService.logOut()
  }

}
