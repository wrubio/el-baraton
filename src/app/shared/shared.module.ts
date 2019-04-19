import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componets
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
