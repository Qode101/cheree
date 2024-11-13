import { Component } from '@angular/core';

@Component({
  selector: 'app-hoodies',
  standalone: true,
  imports: [],
  template: `
  <div class="crypto-section">
  <h1><span>Hoodies</span> Collection</h1>
  <div class="features">
    <div class="feature">
      <img src="assets/hoodies1.jpg" alt="Untraceable Icon">
      <h4>All white</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hoodies2.jpg" alt="Untraceable Icon">
      <h4>Blue Champion Trucker Hat</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hoodies3.jpg" alt="Untraceable Icon">
      <h4>Vintage-USA Trucker Hat</h4>
      <p>Ksh 1499</p>
    </div>
    <div class="feature">
      <img src="assets/hoodies4.jpg" alt="Autonomy Icon">
      <h4>Vintage-Champion Trucker Hat</h4>
      <p>Ksh 1499.</p>
    </div>
    <div class="feature">
      <img src="assets/hoodies5.jpg" alt="Transparency Icon">
      <h4>Vintage-Black Suede Trucker Hat (Khaligraph Jones Edition 🔥)</h4>
      <p>Ksh 1499</p>
    </div>
  </div>
</div>
  `,
  styleUrl:'./hoodies.component.css'
})
export class HoodiesComponent {

}
