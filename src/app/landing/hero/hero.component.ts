import { Component } from '@angular/core';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  template: `
  <div class=hero> 
    <video autoplay loop muted plays-inline class="background-clip">
          <source src="/assets/homeVideo.mp4" type="video.mp4">
    </video>

    <div class="head1">
    <h1>Vintage Finds and Modern Must-Haves</h1>
    </div>
    <div class="head2">
  <p>
      Browse our latest products
    </p>
</div>
  <button>Start Exploring</button>
    </div>
    <!-- <div class="prod">
      <h3>Products</h3>
    </div> -->
  `,
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
