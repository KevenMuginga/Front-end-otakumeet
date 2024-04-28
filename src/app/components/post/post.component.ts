import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../model/post';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComentarioService } from '../../../services/comenratio/comentario.service';
import { Comentario } from '../../../model/comentario';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  id!: number;
  post:Post = Object.create(null);
  comentarios: Comentario[] = [];
  form!:FormGroup;
  token: any = String(window.localStorage.getItem('token'));

  constructor(
    private activatedRout: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao:['', Validators.required],
    })
    this.id = Number(this.activatedRout.snapshot.paramMap.get('id'));
    this.get();
  }

  get(){
    this.postService.getById(this.id).subscribe({
      next:(res=>{
        this.post = res;
        this.getComentarios();
      }),
      error:(()=>{
        console.error("error get post")
      })
    })
  }

  getComentarios(){
    this.comentarioService.getAll(this.id).subscribe({
      next:(res=>{
        this.comentarios = res;
      }),
      error:(()=>{
        console.error("error get Comentarios")
      })
    })
  }

  onSubmit(){
    let comentario = this.form.value as Comentario;
    comentario.postId = this.id;
    this.comentarioService.post(comentario).subscribe({
      next:(res=>{
        this.form.reset();
        this.getComentarios();
      }),
      error:(()=>{
        console.error("erro post comentario")
      })
    })
  }

  addEstrela(post: Post){

  }

}
