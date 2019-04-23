import { RouterModule, Routes, Router } from '@angular/router';
import { Component } from '@angular/core';

// Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';


const pagesRoutes: Routes = [
    { path: '',
        component:  PagesComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'category/:id', component: CategoriesComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PagesRoutes = RouterModule.forChild(pagesRoutes);
