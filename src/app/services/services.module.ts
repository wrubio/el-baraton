import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CategoriesService, ProductsService } from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
      CategoriesService,
      ProductsService
    ],
    declarations: []
})

export class ServiceModule {}
