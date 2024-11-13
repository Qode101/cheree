import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
  <!-- src/app/navbar/navbar.component.html -->
<nav class="navbar">
  <div class="navbar-logo">
    <img src="assets/cheree-logo-Black.png" alt="Cheree Logo">
  </div>
  <ul class="navbar-menu">
    <li class="navbar-item">Our Collections</li>
    <li class="navbar-item">New & Featured
      <div class="dropdown-content">
        <div class="dropdown-section">
          <h4>New & Featured</h4>
          <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">New & Upcoming Drops</a></li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h4>Trending</h4>
          <ul>
            <li><a href="#">ACG</a></li>
            <li><a href="#">Lifestyle Running</a></li>
            <li><a href="#">The Color Shop</a></li>
            <li><a href="#">Shop Sport</a></li>
            <li><a href="#">Father's Day Shop</a></li>
            <li><a href="#">Jordan Heat Check</a></li>
            <li><a href="#">Aura Bag</a></li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h4>Shop Classics</h4>
          <ul>
            <li><a href="#">Dunk</a></li>
            <li><a href="#">Air Jordan 1</a></li>
            <li><a href="#">Air Force</a></li>
            <li><a href="#">Air Max</a></li>
            <li><a href="#">Blazer</a></li>
            <li><a href="#">Vomero</a></li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="#">SNKRS Launch Calendar</a></li>
            <li><a href="#">Running Shoe Finder</a></li>
            <li><a href="#">Bra Finder</a></li>
            <li><a href="#">Product Care</a></li>
            <li><a href="#">Member Rewards</a></li>
            <li><a href="#">Buying Guides</a></li>
          </ul>
        </div>
      </div>
    </li>
    <li class="navbar-item">Men</li>
    <li class="navbar-item">Women</li>
    <li class="navbar-item">Kids</li>
    <li class="navbar-item">Jordan</li>
  </ul>
  <div class="navbar-icons">
    <span class="icon search-icon">🔍</span>
    <span class="icon heart-icon">❤️</span>
    <span class="icon cart-icon">🛒</span>
  </div>
</nav>

  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {}