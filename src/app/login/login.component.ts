import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimeService } from '../../services/anime/anime.service';
import { PersonagemService } from '../../services/personagem/personagem.service';
import { Anime } from '../../model/anime';
import { Personagem } from '../../model/personagem';
import { Login } from '../../model/login';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  allAnimes: Anime[] = []
  allPersonagem: Personagem[] = []
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private animeService: AnimeService,
    private personagemService: PersonagemService,
    private loginService: LoginService,
  ){}

  ngOnInit(): void { 
    this.formLogin = this.formBuilder.group({
      anime: ['', Validators.required],
      personagem: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  // getAllAnimes(){
  //   this.animeService.getAll().subscribe({
  //     next:(res=>{
  //       this.allAnimes = res;
  //     }),
  //     error(err) {
  //       console.log('erro')
  //     },
  //   })
  // }

  // getPersonagens(){
  //   this.personagemService.ge().subscribe({
  //     next:(res=>{
  //       this.allAnimes = res;
  //     }),
  //     error(err) {
  //       console.log('erro')
  //     },
  //   })
  // }

  onSubmit(){
    const login = this.formLogin.value as Login;

    this.loginService.login(login)
  }

}
