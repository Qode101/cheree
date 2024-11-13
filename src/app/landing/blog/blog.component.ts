import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="marketing-container">
      <h2>Stay up to date on the latest news and Products</h2>
      <div class="cards-container">
        <div class="card" *ngFor="let item of items">
          <img [src]="item.image" alt="News Image">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button>More info</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  items = [
    {
      image: 'assets/img1.jpg',
      title: 'Sustainable Fashion: Why Thrifting is the Future',
      description: 'As the fashion industry continues to grow, so does its impact on the environment. At Cheree, we believe in promoting sustainable fashion through thrifting. By purchasing pre-loved items, you are not only saving money but also reducing waste and conserving resources. Join us in making a positive impact on the planet, one stylish outfit at a time.',
    },
    {
      image: 'assets/img5.jpg',
      title: 'How to Find Hidden Gems in Thrift Stores',
      description: 'Thrift shopping can be an adventure, and finding that perfect piece is a thrill like no other. At Cheree, we curate a collection of high-quality items to make your shopping experience enjoyable and rewarding. In this blog, we will share tips and tricks on how to spot those hidden gems and make the most out of your thrifting trips',
    },
    {
      image: 'assets/Herooo.jpg',
      title: ' Behind the Scenes: How Cheree Curates Its Collection',
      description: 'Ever wondered how we select the items that end up in our store? In this behind-the-scenes look, we take you through the curation process at Cheree. From sourcing high-quality pieces to ensuring each item meets our standards, learn how we bring you the best thrifted fashion online.',
    },
    {
      image: 'path-to-image4.jpg',
      title: 'EazzyBiz with SC',
      description: 'EazzyBiz has all the tools designed to ensure that you can maintain your competitive advantage...',
    },
  ];
}
