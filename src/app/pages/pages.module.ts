import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Componets
import { HomeComponent } from './home/home.component';

// Routes
import { PagesRoutes } from './pages.routes';
import { PagesComponent } from './pages.component';

// Libraries
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesRoutes,
    SlickCarouselModule,
    FormsModule
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
