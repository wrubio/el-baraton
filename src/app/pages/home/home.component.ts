import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subsProducts: any;
  subsBreakPoints: any;
  matcher: MediaQueryList;
  products: any;
  slideConfig: any;
  drinks = [{ nombre: '', valor: '', fecha: '', img: '../../../assets/media/img/drinks/5.jpg'} ];
  breakfast = [{ nombre: '', valor: '', fecha: '', img: '../../../assets/media/img/drinks/5.jpg'} ];
  lunches = [{ nombre: '', valor: '', fecha: '', img: '../../../assets/media/img/drinks/5.jpg'} ];
  wines = [{ nombre: '', valor: '', fecha: '', img: '../../../assets/media/img/drinks/5.jpg'} ];
  lsArray = [];

  constructor(private productsService: ProductsService) {
    /**
     * Carga los datos iniciales de la SPA
     */
    this.subsProducts = this.productsService.getProducts().subscribe((result: any) => {
      this.products = result.products;
      this.getDrinks();
      this.getBreakfast();
      this.getLunches();
      this.getWines();
    });
    this.viewPort();
  }

  ngOnInit() {
    window.onresize = () => { this.viewPort(); };
  }
  /**
   * Permite controlar el numero de productos a mostrar en el slideshow
   * acorde el viewport o breakpoint de bootstrap
   */
  viewPort() {
    const viewportSize = document.documentElement.clientWidth;
    if (viewportSize >= 1200) {
      this.slideConfig = {slidesToShow: 5, slidesToScroll: 5};
    } else if ( viewportSize < 1200 && viewportSize >= 992) {
      this.slideConfig = {slidesToShow: 3, slidesToScroll: 3};
    } else if ( viewportSize < 992 && viewportSize >= 768) {
      this.slideConfig = {slidesToShow: 2, slidesToScroll: 2};
    } else {
      this.slideConfig = {slidesToShow: 1, slidesToScroll: 1};
    }
  }
  /**
   * Obtiene todos los productos de bebidas
   */
  getDrinks() {
    this.drinks = this.products.filter((product: any) => {
      if (product.sublevel_id === 1 || product.sublevel_id === 2 || product.sublevel_id === 3) {
        if (product.available) {
          return product;
        }
      }
    });
  }
  /**
   * Obtiene todos los productos de desayuno
   */
  getBreakfast() {
    this.breakfast = this.products.filter((product: any) => {
      if (product.sublevel_id === 4 || product.sublevel_id === 5 || product.sublevel_id === 6 || product.sublevel_id === 7) {
        if (product.available) {
          return product;
        }
      }
    });
  }
  /**
   * Obtiene todos los productos de almuerzo
   */
  getLunches() {
    this.lunches = this.products.filter((product: any) => {
      if (product.sublevel_id === 8 || product.sublevel_id === 9 || product.sublevel_id === 10) {
        if (product.available) {
          return product;
        }
      }
    });
  }
  /**
   * Obtiene todos los productos de vinos
   */
  getWines() {
    this.wines = this.products.filter((product: any) => {
      if (product.sublevel_id === 11 || product.sublevel_id === 12 || product.sublevel_id === 13) {
        if (product.available) {
          return product;
        }
      }
    });
  }
  /**
   * Agrega el item comprado al localstorage del cliente para visualizarlo
   * en el carrito
   * @param e: HTMLElement
   */
  buyProduct(e: HTMLElement) {
    const eleID = e.getAttribute('data-id');
    const product = this.products.filter((prod: any) => {
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
