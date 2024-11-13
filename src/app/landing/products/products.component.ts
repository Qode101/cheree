import { Component } from '@angular/core';


@Component({
  selector: 'app-products', 
  standalone: true,
  imports: [],
  template: `
    <div class="container">
  <div class="inner-container">
     <h1>
    <span class="highlight">Looku</span> ni Moto🔥
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
          <h3>Kicks catalogue</h3>
          <p>
            Shop Sustainably, Dress Stylishly
          </p>
          <button class="button">
            Shop Now
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
          <h3>Upper-body wear</h3>
          <p>
            Curated Collections, Timeless Styles
          </p>
          <button class="button">
            Shop Now
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
          <h3>Executive Galore</h3>
          <p>
            Sustainable Style Starts Here 
          </p>
          <button class="button">
            Shop Now
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
          <h3>Trendy Thrift</h3>
          <p>
            There's something for everybody
          </p>
          <button class="button">
            Shop Now
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
