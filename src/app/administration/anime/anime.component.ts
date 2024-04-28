import { Component, OnInit } from '@angular/core';
import { Anime } from '../../../model/anime';
import { AnimeService } from '../../../services/anime/anime.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})
export class AnimeComponent implements OnInit{

  allAnimes: Anime[] = [];
  animes: Anime[] = [];

  constructor(
    private animeService: AnimeService,
  ){}

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.animeService.getAll().subscribe({
      next:(res=>{
        this.allAnimes = res;
        this.animes = res;
      }),
      error:(()=>{
        console.error("error get animes")
      })
    })
  }

  search(event:any){
    let value = event.target.value;

    this.animes = this.allAnimes.filter(object=>{
      return object.nome.includes(value) ||
             object.autor.includes(value);
    })
  }
}
