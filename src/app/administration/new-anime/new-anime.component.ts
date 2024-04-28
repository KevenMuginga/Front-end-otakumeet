import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimeService } from '../../../services/anime/anime.service';
import { Anime } from '../../../model/anime';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-anime',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './new-anime.component.html',
  styleUrl: './new-anime.component.css'
})
export class NewAnimeComponent implements OnInit{

  form!: FormGroup;
  selectedFile!: File;
  anime: Anime = Object.create(null);

  constructor(
    private formBuilder: FormBuilder,
    private animeService: AnimeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.getAnimeById(Number(this.activatedRoute.snapshot.paramMap.get('id')))
    }

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      autor: ['', Validators.required],
    })
  }

  onSelectFile(event:any){
    this.selectedFile = event.target.files[0] as File;
  }

  getAnimeById(id: number){
    this.animeService.getById(id).subscribe({
      next:(res=>{
        this.anime = res
        this.setForm();
      }),
      error:(()=>{
        console.error("error get anime")
      })
    })
  }

  setForm(){
    this.form.controls['nome'].setValue(this.anime.nome);
    this.form.controls['autor'].setValue(this.anime.autor);
  }

  onSubmit(){
    let formData = new FormData();
    formData.append('nome', this.form.value.nome);
    formData.append('autor', this.form.value.autor);
    formData.append('file', this.selectedFile);

    if(this.anime.id){
      formData.append('id', this.anime.id.toString());
      this.put(formData)
    }else{
      this.post(formData)
    }
    
  }
  put(anime: FormData) {
    this.animeService.put(anime).subscribe({
      next:(res=>{
        this.form.reset();
        this.router.navigate(['/administration']);
      }),
      error:(()=>{
        console.error("error put")
      })
    })
  }


  post(anime: FormData){
    this.animeService.post(anime).subscribe({
      next:(res=>{
        this.form.reset();
        this.router.navigate(['/administration']);
      }),
      error:(()=>{
        console.error("error post")
      })
    })
  }
}
