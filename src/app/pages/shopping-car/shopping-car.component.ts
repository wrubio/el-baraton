import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  products: any;
  val: number;
  totalItem = 0;
  totalPrice = 0;
  showLoader = false;

  constructor() {
    /**
     * Verfica si existen datos guardados en el localstorage para mostrar en esta vista
     */
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
      this.products.map((prd: any) => {
        this.totalItem += parseInt(prd.total, 10);
        const price = prd.price.split('$').pop().replace(/,/g, '.');
        this.totalPrice += (parseInt(prd.total, 10) * parseFloat(price));
      });
    } else {
      this.products = [];
    }
  }

  ngOnInit() {
  }
  /**
   * Permite agregar o quitar cantidades de productos a comprar
   * @param e: Event
   */
  setValue(e: any) {
    const eventType = e.closest('button').getAttribute('data-event');
    const eleInput = e.closest('.input-group').children[0];
    const prdID = eleInput.getAttribute('data-itemID');
    this.totalItem = 0;
    this.totalPrice = 0;

    if (eventType === 'up') {
      eleInput.value = parseInt(eleInput.value, 10) + 1;
      this.val = eleInput.value;
    } else {
      console.log(parseInt(eleInput.value, 10));
      if (parseInt(eleInput.value, 10) > 1) {
        eleInput.value = parseInt(eleInput.value, 10) - 1;
        this.val = eleInput.value;
      }
    }

    this.products.map((prd: any) => {
      if (prd.id === prdID) {
        prd.total = this.val;
      }
      this.totalItem += parseInt(prd.total, 10);
      const price = prd.price.split('$').pop().replace(/,/g, '.');
      this.totalPrice += (parseInt(prd.total, 10) * parseFloat(price));
    });

    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(this.products));
  }
  /**
   * Elimina un producto del carrito y del localstorage
   * @param e: HTMLElement
   */
  deleteItem(e: HTMLElement) {
    const itemID = e.getAttribute('data-itemID');
    this.products = this.products.filter((prd: any, i: number) => {
      if (prd.id !== itemID) {
        return prd;
      }
    });
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(this.products));
    if (this.products.length === 0) {
      this.totalItem = 0;
      this.totalPrice = 0;
    }
  }
  /**
   * Simple loading para simular una transaccion, es una promesa con timeOut
   */
  loading() {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ok: true});
      }, 3000);
    });
  }
  /**
   * Confirma si se desa realizar el pedido y borra el localstorage en caso de aceptar
   * realizar el pedido
   */
  confirmation() {
    const totalCost = document.getElementById('total-cost').innerHTML;
    if (parseInt(totalCost, 10) !== 0) {
      swal({
        title: '¿Confirmar?',
        text: `confirmado su pedido, se le descontara el valor de ${totalCost} de su tarjeta inscrita`,
        icon: 'warning',
        buttons: ['Cancelar', 'Confirmar'],
        dangerMode: true
      }).then((res: any) => {
        if (res) {
          this.showLoader = true;
          this.loading().then((result: any) => {
            if (result.ok) {
              this.showLoader = false;
              swal('Gracias!', `Su pedido fue procesado con éxito`, 'success');
              localStorage.removeItem('products');
              this.products = [];
              this.totalItem = 0;
              this.totalPrice = 0;
            }
          });
        }
      });
    }
  }
}
