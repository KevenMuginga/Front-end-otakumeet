import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimeService } from '../../../services/anime/anime.service';
import { Anime } from '../../../model/anime';

@Component({
  selector: 'app-newpersonagem',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './newpersonagem.component.html',
  styleUrl: './newpersonagem.component.css'
})
export class NewpersonagemComponent implements OnInit{

  form!: FormGroup;
  animeId!: number;
  selectedFile!: File;
  anime: Anime = Object.create(null);

  constructor(
    private personagemService: PersonagemService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private animeSereice: AnimeService,
    private router: Router,

  ){}

  ngOnInit(): void {
    this.animeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAnime()
    
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    })
  }

  onSelectFile(event:any){
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit(){
    let formData = new FormData();
    formData.append('nome', this.form.value.nome);
    formData.append('animeId', this.animeId.toString());
    formData.append('file', this.selectedFile);

    this.personagemService.post(formData).subscribe({
      next:(res=>{
        this.form.reset();
        this.router.navigate(['/administration/anime/'+this.animeId]);
      }),
      error:(()=>{
        console.error("error post")
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

}
