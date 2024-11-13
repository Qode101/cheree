import { Component } from '@angular/core';
// banner.component.tsimport { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
    <div class="banner-container">
      <h1>{{ title }}</h1>
      <p>{{ tagline }}</p>
    </div>
  `,
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  // Properties for the banner such as title, tagline, etc.
  title: string = 'Your Next Fashion Find Awaits';
  tagline: string = 'Discover unique clothing at unbeatable prices!';
}
