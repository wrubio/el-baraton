import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  subsProducts: any;
  categoryProducts: any;
  disponibility: false;
  avail: boolean;
  price: string;
  quantity: string;
  search: string;
  strinJson: any = JSON;
  lsArray = [];

  constructor(private productsService: ProductsService, private router: Router) {
    /**
     * Permite recargar la informacion cuando hay cambios en las rutas
     */
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        const url = this.router.url;
        const levelID = parseInt(url.split('sublevel').pop(), 10);
        this.subsProducts = this.productsService.getProducts().subscribe((result: any) => {
          this.categoryProducts = result.products.filter((product: any) => {
            if (product.sublevel_id ===  levelID) {
              return product;
            }
          });
        });
      }
    });
  }

  ngOnInit() {
  }
  /**
   * Permite ordenar los productos del precio mas bajo al mas alto
   * @param val: Event
   */
  priceLow(val: any) {
    if (document.getElementById('afterPipe') !== null) {
      const el = document.getElementById('afterPipe').innerHTML;
      const newArray = JSON.parse(el);
      newArray.sort((a: any, b: any) => {
        const aVal = parseInt(a.price.split('$').pop(), 10);
        const bVal = parseInt(b.price.split('$').pop(), 10);
        return bVal - aVal;
      });
      this.categoryProducts = newArray;
    }
  }
  /**
   * Permite ordenar los productos del precio mas alto al mas bajo
   * @param val: Event
   */
  priceHigh(val: any) {
    if (document.getElementById('afterPipe') !== null) {
      const el = document.getElementById('afterPipe').innerHTML;
      const newArray = JSON.parse(el);
      newArray.sort((a: any, b: any) => {
        const aVal = parseInt(a.price.split('$').pop(), 10);
        const bVal = parseInt(b.price.split('$').pop(), 10);
        return  aVal - bVal;
      });
      this.categoryProducts = newArray;
    }
  }
  /**
   * Permite ordenar los productos por disponibilidad (true, false)
   * @param val: Event
   */
  available(val: any) {
    if (document.getElementById('afterPipe') !== null) {
      const el = document.getElementById('afterPipe').innerHTML;
      const newArray = JSON.parse(el);
      newArray.sort((a: any, b: any) => {
        return  b.available - a.available;
      });
      this.categoryProducts = newArray;
    }
  }
  /**
   * Permiete organizar los productos por cantidad de menor a mayor
   * @param val: Event
   */
  quantityLow(val: any) {
    if (document.getElementById('afterPipe') !== null) {
      const el = document.getElementById('afterPipe').innerHTML;
      const newArray = JSON.parse(el);
      newArray.sort((a: any, b: any) => {
        return b.quantity - a.quantity;
      });
      this.categoryProducts = newArray;
    }
  }
  /**
   * Permite organizar los elementos por cantidad de mayor a menor
   * @param val: Event
   */
  quantityHigh(val: any) {
    if (document.getElementById('afterPipe') !== null) {
      const el = document.getElementById('afterPipe').innerHTML;
      const newArray = JSON.parse(el);
      newArray.sort((a: any, b: any) => {
        return  a.quantity - b.quantity;
      });
      this.categoryProducts = newArray;
    }
  }
  /**
   * Filtra los productos pordisponibilidad (true, false)
   * @param event: Event
   */
  checkDisponibility(event: Event) {
    if (event) {
      this.avail = true;
    } else {
      this.avail = false;
    }
  }
  /**
   * Filtra los productos por un rago de precio (max, min)
   * @param form: NgForm
   */
  priceRange(form: NgForm) {
    if (form.valid) {
      this.price = `${form.value.min}-${form.value.max}`;
    }
  }
  /**
   * Filtra los productos por un rango de cantidad (max, min)
   * @param form: ngForm
   */
  quantityRange(form: NgForm) {
    if (form.valid) {
      this.quantity = `${form.value.min}-${form.value.max}`;
    }
  }
  /**
   * Filtra un producto en especifico por el nombre del producto
   * @param form: ngForm
   */
  findElement(form: NgForm) {
    if (form.valid) {
      this.search = form.value.searchProduct;
    }
  }
  /**
   * Agrega el item comprado al localstorage del cliente para visualizarlo
   * en el carrito
   * @param e: HTMLElement
   */
  buyProduct(e: HTMLElement) {
    const eleID = e.getAttribute('data-id');
    const product = this.categoryProducts.filter((prod: any) => {
      if (prod.id === eleID) {
        return prod;
      }
    });
    product[0].total = 1;
    if (localStorage.getItem('products')) {
      this.lsArray = JSON.parse(localStorage.getItem('products'));
      const haveItem = this.lsArray.filter((exist: any) => {
        if (product[0].id === exist.id) {
          exist.total += 1;
          return exist;
        }
      });
      if (haveItem.length === 0) {
        this.lsArray.push(product[0]);
        localStorage.setItem('products', JSON.stringify(this.lsArray));
      } else {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(this.lsArray));
      }
    } else {
      this.lsArray.push(product[0]);
      localStorage.setItem('products', JSON.stringify(this.lsArray));
    }
    swal('Gracias!', `Su producto "${product[0].name}" se agrego a su carrito.`, 'success');
  }

  ngOnDestroy() {
    this.subsProducts.unsubscribe();
  }
}
