import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimeService } from '../../services/anime/anime.service';
import { PersonagemService } from '../../services/personagem/personagem.service';
import { Anime } from '../../model/anime';
import { Personagem } from '../../model/personagem';
import { CommonModule } from '@angular/common';
import { CadastroService } from '../../services/cadastro/cadastro.service';
import { Usuario } from '../../model/usuario';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{

  form!: FormGroup;
  animes: Anime[] = [];
  personagens: Personagem[] = [];

  constructor(
    private animeService: AnimeService,
    private personagemService: PersonagemService,
    private usuarioService: CadastroService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.getAnimes();

    this.form = this.formBuilder.group({
      personagemId: [0, Validators.required],
      nome: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  getAnimes(){
    this.animeService.getAll().subscribe({
      next:(res=>{
        this.animes = res;
      }),
      error:(()=>{
        console.error("error get animes")
      })
    })
  }

  getPersonagens(id: any){
    this.personagemService.getPersonageWithoutUser(id.target.value).subscribe({
      next:(res=>{
        this.personagens = res;
      }),
      error:(()=>{
        console.error("error get animes")
      })
    })
  }

  onSubmit(){
    let usuario = this.form.value as Usuario;
    console.log(usuario);
     this.usuarioService.post(usuario).subscribe({
       next:(res=>{
         this.router.navigate(['/login']);
       }),
       error:(()=>{
         console.error("error get animes")
       })
     })
  }

}
