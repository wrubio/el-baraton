import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subsProducts: any;
  products: any;
  slideConfig = {slidesToShow: 5, slidesToScroll: 5};
  drinks = [{ nombre: '', valor: '', fecha: ''} ];
  breakfast = [{ nombre: '', valor: '', fecha: ''} ];
  lunches = [{ nombre: '', valor: '', fecha: ''} ];
  wines = [{ nombre: '', valor: '', fecha: ''} ];

  constructor(private productsService: ProductsService) {
    this.subsProducts = this.productsService.getProducts().subscribe((result: any) => {
      this.products = result.products;
      this.getDrinks();
      this.getBreakfast();
      this.getLunches();
      this.getWines();
    });
  }

  ngOnInit() {
  }

  getDrinks() {
    this.drinks = this.products.filter((product: any) => {
      if (product.sublevel_id === 1 || product.sublevel_id === 2 || product.sublevel_id === 3) {
        if (product.available) {
          return product;
        }
      }
    });
    console.log(this.drinks);
  }

  getBreakfast() {
    this.breakfast = this.products.filter((product: any) => {
      if (product.sublevel_id === 4 || product.sublevel_id === 5 || product.sublevel_id === 6 || product.sublevel_id === 7) {
        if (product.available) {
          return product;
        }
      }
    });
    console.log(this.breakfast);
  }

  getLunches() {
    this.lunches = this.products.filter((product: any) => {
      if (product.sublevel_id === 8 || product.sublevel_id === 9 || product.sublevel_id === 10) {
        if (product.available) {
          return product;
        }
      }
    });
    console.log(this.lunches);
  }

  getWines() {
    this.wines = this.products.filter((product: any) => {
      if (product.sublevel_id === 11 || product.sublevel_id === 12 || product.sublevel_id === 13) {
        if (product.available) {
          return product;
        }
      }
    });
    console.log(this.wines);
  }
}
