import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  subsProducts: any;
  categoryProducts: any;
  disponibility: false;

  constructor(private productsService: ProductsService, private router: Router) {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationStart) {
        const url = event.url;
        const levelID = parseInt(url.split('sublevel').pop(), 10);
        this.subsProducts = this.productsService.getProducts().subscribe((result: any) => {
          this.categoryProducts = result.products.filter((product: any) => {
            if (product.sublevel_id ===  levelID) {
              return product;
            }
          });
          console.log(this.categoryProducts);
        });
      }
    });
  }

  ngOnInit() {
  }

  checkDisponibility(event: Event) {
    console.log(event);
  }
  ngOnDestroy() {
    this.subsProducts.unsubscribe();
  }
}
