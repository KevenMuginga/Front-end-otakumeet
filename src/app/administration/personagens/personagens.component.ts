import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeService } from '../../../services/anime/anime.service';
import { Anime } from '../../../model/anime';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.css'
})
export class PersonagensComponent implements OnInit{

  animeId!: number;
  allPersonagem: Personagem[] = [];
  personagens: Personagem[] = [];
  form!: FormGroup;
  anime: Anime = Object.create(null);

  constructor(
    private activatedRoute: ActivatedRoute,
    private personagemSereice: PersonagemService,
    private animeSereice: AnimeService,
  ){}
  
  ngOnInit(): void {
    this.get();
  }

  get(){
    this.animeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.personagemSereice.getAllByAnime(this.animeId).subscribe({
      next:(res=>{
        this.getAnime();
        this.allPersonagem = res;
        this.personagens = res;
      }),
      error:(()=>{
        console.error("error get personagens")
      })
    })
  }

  getAnime(){
    this.animeSereice.getById(this.animeId).subscribe({
      next:(res=>{
        this.anime = res;
      
      }),
      error:(()=>{
        console.error("error get personagens")
      })
    })
  }

  onSubmit(){
    
  }

  search(event:any){
    let value = event.target.value;

    this.personagens = this.allPersonagem.filter(object=>{
      return object.nome.includes(value)
    })
  }

}
