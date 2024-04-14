import { Component, Input, OnInit } from '@angular/core';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { Post } from '../../../model/post';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  @Input() id!: number;
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  get(){
    this.postService.getById(this.id).subscribe({
      next:(res=>{

      }),
      error:(()=>{
        console.error("erro geting post")
      })
    })
  }

}
