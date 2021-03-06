import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Routes
import { AppRoutes } from './app.routes';

// Modules
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

// Services
import { ServiceModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    ServiceModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
