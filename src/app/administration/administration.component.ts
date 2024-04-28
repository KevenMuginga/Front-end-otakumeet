import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime/anime.service';
import { Anime } from '../../model/anime';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {
  
}
