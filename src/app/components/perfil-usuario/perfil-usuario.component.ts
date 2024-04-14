import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../../../model/post';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{

  @Input() id: number = 0;
  posts: Post[] = [];
  personagem: Personagem = Object.create(null);

  constructor(
    private personagemService: PersonagemService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ){

    this.router.events.subscribe(event => {

      // if (event instanceof NavigationStart) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPersonagem();
    this.get();
      // }
  })
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPersonagem();

    this.get();
  }

  get(){
    this.postService.GetByAllOfPersonagem(this.id).subscribe({
      next:(res=>{
        this.posts = res;
      }),
      error:(()=>{
        console.error("erro geting post")
      })
    })
  }

  getPersonagem(){
    this.personagemService.getById(this.id).subscribe({
      next:(res=>{
        this.personagem = res
      }),
      error:(()=>{
        console.error("erro geting personagem")
      })
    })
  }

}
