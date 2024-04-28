import { Component } from '@angular/core';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { MessageComponent } from '../components/message/message.component';
import { PostsComponent } from '../components/posts/posts.component';
import { jwtDecode } from 'jwt-decode';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FollowingComponent } from '../components/following/following.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otaku-meet',
  standalone: true,
  imports: [PerfilComponent, MessageComponent, PostsComponent, RouterOutlet, FollowingComponent, CommonModule],
  templateUrl: './otaku-meet.component.html',
  styleUrl: './otaku-meet.component.css'
})
export class OtakuMeetComponent {

  conexao: any;
  unfollowed!: number;
  follow!: number;
  // random = 


  onConexao(event: any){
    this.conexao = event;
    console.log("conexao");
    console.log(event);
    console.log(this.conexao);
  }

  OnSignalUnfollow(event: any){
    this.unfollowed = this.random();
  }

  onFollowUser(event: any){
    console.log("event emited");
    this.follow = this.random();
  }

  random(){
    return Math.floor(Math.random() * 100)
  }

}
