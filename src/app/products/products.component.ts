import { Component } from '@angular/core';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
  <div class="inner-container">
     <h1>
    Looku ni
    <span class="highlight">Moto</span>🔥
  </h1>
  <h4>Hottest and latest in the 254 </h4>
    <div class="grid">
      
      <div class="card">
        <div class="img-container">
          <img
            src="assets/img6.jpg"
            alt="Family having dinner"
            class="img"
          />
        </div>
        <div class="content">
          <h3>Automated Deposits to Deriv</h3>
          <p>
            Our automated fees.
          </p>
          <button class="button">
            Download the App
            <span class="arrow">&#8594;</span>
          </button>
        </div>
      </div>

      

      <div class="card">
        <div class="img-container">
          <img
            src="assets/img4.jpg"
            alt="Senior couple"
            class="img"
          />
        </div>
        <div class="content">
          <h3>Fast Deposits & Withdrawals</h3>
          <p>
            Our intelligent.
          </p>
          <button class="button">
            Find Out More
            <span class="arrow">&#8594;</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="img-container">
          <img
            src="assets/img3.jpg"
            alt="Senior couple"
            class="img"
          />
        </div>
        <div class="content">
          <h3>Fast Deposits & Withdrawals</h3>
          <p>
            Our intelligent 
          </p>
          <button class="button">
            Find Out More
            <span class="arrow">&#8594;</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="img-container">
          <img
            src="assets/img2.jpg"
            alt="Senior couple"
            class="img"
          />
        </div>
        <div class="content">
          <h3>Fast Deposits & Withdrawals</h3>
          <p>
            Our intelligent 
          </p>
          <button class="button">
            Find Out More
            <span class="arrow">&#8594;</span>
          </button>
        </div>
      </div>

      

    </div>
  </div>
</div>
  `,
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
