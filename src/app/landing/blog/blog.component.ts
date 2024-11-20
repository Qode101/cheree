import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',  // Reference to the external HTML template
  styleUrls: ['./blog.component.css']   // Reference to the external CSS styles
})
export class BlogComponent {
  // The items array is not needed since we're using hardcoded values in the HTML.
  // However, if you want to keep it for future use or dynamic loading, you can leave it here.
}
