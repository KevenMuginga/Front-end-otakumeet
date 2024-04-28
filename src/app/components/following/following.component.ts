import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Follow } from '../../../model/follow';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { Grupo } from '../../../model/chat';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.css',
})
export class FollowingComponent implements OnInit, OnChanges {

  @Output() unfollowUser = new EventEmitter<any>();
  @Input() followUser!: number;

  followings: Personagem[] = [];
  follow: Follow = Object.create(null);
  grupo: Grupo = Object.create(null);


  constructor(
    private personagemService: PersonagemService,
    private gruposService: GrupoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.get()
  }

  ngOnInit(): void {
    this.get();
  }

  random(){
    return Math.floor(Math.random() * 100)
  }

  get() {
    this.personagemService.getImFollowing().subscribe({
      next: (res) => {
        this.followings = res;
        console.log(this.followings);
      },
      error: (res) => {
        console.error('error get followings');
      },
    });
  }

  unfollow(personagem: Personagem) {
    this.follow.personagemId = personagem.id;
    this.personagemService.stopFollow(this.follow).subscribe({
      next: (res) => {
        this.grupo.segundaPersonagemId = personagem.id;
        this.follow = Object.create(null);
        this.get();
        this.getChat();
      },
      error: (res) => {
        console.error('error get followings');
      },
    });
  }

  getChat() {
    this.gruposService.getAllByChat(this.grupo).subscribe({
      next: (res) => {
        console.log(res);
        this.deleteGrupo(res[0].id);
      },
      error: (res) => {
        console.error('error get chatByChat');
      },
    });
  }

  deleteGrupo(id: number) {
    this.gruposService.delete(id).subscribe({
      next: (res) => {
        this.unfollowUser.emit('delete');
      },
      error: (res) => {
        console.error('error get chatByChat');
      },
    });
  }
}
