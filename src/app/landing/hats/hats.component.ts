import { Component } from '@angular/core';

@Component({
  selector: 'app-hats',
  standalone: true,
  imports: [],
  template: `
  <div class="crypto-section">
  <h1>Hat<span> Collection</span></h1>
  <div class="features">
    <div class="feature">
      <img src="assets/hat1.jpg" alt="Untraceable Icon">
      <h4>All white Baseball Trucker Hat</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hat2.jpg" alt="Untraceable Icon">
      <h4>Blue Champion Trucker Hat</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hat3.jpg" alt="Untraceable Icon">
      <h4>Vintage-USA Trucker Hat</h4>
      <p>Ksh 1499</p>
    </div>
    <div class="feature">
      <img src="assets/hat4.jpg" alt="Autonomy Icon">
      <h4>Vintage-Champion Trucker Hat</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hat5.jpg" alt="Transparency Icon">
      <h4>Vintage-Black Suede Trucker Hat (Khaligraph Jones Edition 🔥)</h4>
      <p>Ksh 1499</p>
    </div>
  </div>
</div>
  `,
  styleUrl: './hats.component.css'
})
export class HatsComponent {

}
