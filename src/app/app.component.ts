import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HammerGestureConfig } from '@angular/platform-browser';
import { HatsComponent } from './hats/hats.component';
import { HoodiesComponent } from './hoodies/hoodies.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<section>
    <app-banner></app-banner>
  </section>
  <section>
    <app-navbar></app-navbar>
  </section>
  <section>
    <app-hero></app-hero>
  </section>
  <section>
    <app-products></app-products>
  </section>
  <section>
    <app-catalogue></app-catalogue>
  </section>
  <section>
    <app-hats></app-hats>
  </section>
  <section>
    <app-hoodies></app-hoodies>
  </section>
  <section>
    <app-footer></app-footer>
  </section>
  `,
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, HeroComponent, HatsComponent, ProductsComponent, HoodiesComponent, FooterComponent, BannerComponent, CatalogueComponent]
})
export class AppComponent {
  title = 'Cheree E-Commerce Web App';
}