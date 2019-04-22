import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Componets
import { HomeComponent } from './home/home.component';

// Routes
import { PagesRoutes } from './pages.routes';
import { PagesComponent } from './pages.component';

// Libraries
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesRoutes,
    SlickCarouselModule
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
