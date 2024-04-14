import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../model/post';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Personagem } from '../../../model/personagem';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  allPosts: Post[] = [];
  file!: File;

  form!: FormGroup;
  myPersonage: Personagem = Object.create(null);

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private personagemService: PersonagemService,
  ){}
  
  ngOnInit(): void {
    this.getMyPersonage();
    this.getAllOfPersonageIFollow()

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
    })
  }

  selectFile(event: any){
    this.file = event.target.files[0] as File;
  }

  getAllOfPersonageIFollow(){
    this.postService.getAll().subscribe({
      next:(res=>{
        console.log(res)
        this.allPosts = res.reverse();
      }),
      error:(()=>{
        console.log("erro get posts")
      })
    })
  }

  onSubmit(){
    const post = new FormData();
    post.append('descricao', this.form.value.descricao)
    post.append('file', this.file)
    console.log(post)


    this.postService.post(post).subscribe({
      next:(res=>{
        this.form.reset();
        this.getAllOfPersonageIFollow();
      }),
      error:(()=>{
        console.log("erro posts")
      })
    })
  }

  getMyPersonage(){
    this.personagemService.my().subscribe({
      next:(res=>{
        this.myPersonage = res;
      }),
      error:(()=>{
        console.log("erro get Im")
      })
    })
  }

}
