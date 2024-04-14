import { Component } from '@angular/core';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { MessageComponent } from '../components/message/message.component';
import { PostsComponent } from '../components/posts/posts.component';
import { jwtDecode } from 'jwt-decode';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-otaku-meet',
  standalone: true,
  imports: [PerfilComponent, MessageComponent, PostsComponent, RouterOutlet],
  templateUrl: './otaku-meet.component.html',
  styleUrl: './otaku-meet.component.css'
})
export class OtakuMeetComponent {

  conexao: any;

  onConexao(event: any){
    this.conexao = event;
    console.log("conexao");
    console.log(event);
    console.log(this.conexao);
  }

}
