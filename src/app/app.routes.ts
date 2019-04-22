import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { useHash: true });
