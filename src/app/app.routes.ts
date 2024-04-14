import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta/conta.component';
import { OtakuMeetComponent } from './otaku-meet/otaku-meet.component';
import { autenticacaoGuard } from '../services/guard/autenticacao.guard';
import { Component } from '@angular/core';
import { PostsComponent } from './components/posts/posts.component';
import { ChatComponent } from './components/chat/chat.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'otakumeet', component: OtakuMeetComponent,
    children: [
        {path: '', component: PostsComponent},
        {path: 'chat/:id', component: ChatComponent},
        {path: 'perfil/:id', component: PerfilUsuarioComponent},
        {path: 'post/:id', component: PostComponent},
    ],
     canActivate: [autenticacaoGuard]},

];
