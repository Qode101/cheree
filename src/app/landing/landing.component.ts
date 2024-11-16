import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { HeroComponent } from './hero/hero.component';
import { ProductsComponent } from './products/products.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BlogComponent } from './blog/blog.component';
import { HatsComponent } from './hats/hats.component';
import { HoodiesComponent } from './hoodies/hoodies.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    BannerComponent,
    HeroComponent,
    ProductsComponent,
    CatalogueComponent,
    BlogComponent,
    HatsComponent,
    HoodiesComponent,
    FooterComponent
  ]
})
export class LandingComponent {}
