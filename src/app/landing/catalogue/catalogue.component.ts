// src/app/catalogue/catalogue.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './catalogue.component.html',  // Refer to the external HTML template
  styleUrls: ['./catalogue.component.css']   // Refer to the external CSS styles
})
export class CatalogueComponent {
}
