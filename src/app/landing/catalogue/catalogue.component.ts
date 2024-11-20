// src/app/catalogue/catalogue.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',  // Refer to the external HTML template
  styleUrls: ['./catalogue.component.css']   // Refer to the external CSS styles
})
export class CatalogueComponent {
}
