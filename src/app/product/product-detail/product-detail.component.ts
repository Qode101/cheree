import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  imports: [ FormsModule ],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  quantity = 1;
}
