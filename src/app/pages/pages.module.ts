import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

// Componets
import { HomeComponent } from './home/home.component';

// Routes
import { PagesRoutes } from './pages.routes';
import { PagesComponent } from './pages.component';

// Libraries
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoriesComponent } from './categories/categories.component';

// Pipes
import { DisponibilityPipe } from '../pipes/disponibility.pipe';
import { PricePipe } from '../pipes/price.pipe';
import { QuantityPipe } from '../pipes/quantity.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    CategoriesComponent,
    DisponibilityPipe,
    PricePipe,
    QuantityPipe,
    SearchPipe,
    ShoppingCarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesRoutes,
    SlickCarouselModule,
    FormsModule,
    LayoutModule
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
