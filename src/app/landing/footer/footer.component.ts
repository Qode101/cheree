import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
   <footer class="footer">
  <div class="footer-container">
    <div class="footer-section">
      <h3>Resources</h3>
      <ul>
        <li><a href="#">Gift Cards</a></li>
        <li><a href="#">Find a Store</a></li>
        <li><a href="#">Become a Member</a></li>
        <li><a href="#">Cheree x New Arrivals</a></li>
        <li><a href="#">Cheree Journal</a></li>
        <li><a href="#">Site Feedback</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Customer Support</h3>
      <ul>
        <li><a href="#">Get Help</a></li>
        <li><a href="#">Order Status</a></li>
        <li><a href="#">Shipping and Delivery</a></li>
        <li><a href="#">Returns</a></li>
        <li><a href="#">Order Cancellation</a></li>
        <li><a href="#">Payment Options</a></li>
        <li><a href="#">Gift Card Balance</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Company</h3>
      <ul>
        <li><a href="#">About Cheree</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Culture</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Promotions & Discounts</h3>
      <ul>
        <li><a href="#">Students</a></li>
        <li><a href="#">Corporate</a></li>
        <li><a href="#">Birthday</a></li>
        <li><a href="#">Anniversary</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Cheree, Inc. All Rights Reserved</p>
    <ul>
      <li><a href="#">Guides</a></li>
      <li><a href="#">Terms of Sale</a></li>
      <li><a href="#">Terms of Use</a></li>
      <li><a href="#">Cherees' Privacy Policy</a></li>
      <li><a href="#">Your Privacy Choices</a></li>
      <li><a href="#">Ke Supply Chains Act</a></li>
    </ul>
    <div class="footer-country">
      <span>&#127758;</span> Nairobi, Kenya 
    </div>
  </div>
</footer>

  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
