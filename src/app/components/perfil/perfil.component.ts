import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { FollowingComponent } from '../following/following.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, FollowingComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnChanges{

  @Output() signalUnfollow = new EventEmitter();
  @Input() follow!:number;

  following!: number;
  myPersonagem: Personagem = Object.create(null);

  constructor(
    private personagemService: PersonagemService,
    private loginService: LoginService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("value chaged");
    this.following = this.random();
   this.getMy();
  }

  ngOnInit(): void {
    this.getMy()
  }

  random(){
    return Math.floor(Math.random() * 100)
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

  onUnfollowUser(event: any){
    this.signalUnfollow.emit(this.random());
    this.getMy();
    console.log("event")
    console.log(event.target.value)
  }

  logout(){
    this.loginService.logOut()
  }

}
