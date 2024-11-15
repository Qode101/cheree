import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html', // Reference to the new HTML file
  styleUrls: ['./hero.component.css']   // Ensure this points to your CSS file
})
export class HeroComponent {}
