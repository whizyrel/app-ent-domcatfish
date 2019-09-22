import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';

import { CartService } from '../services/cart.service';
import { CartStoreProps } from '../interfaces/cart-store-props';
import { CartProps } from '../interfaces/cart-props';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    './css/mdb.min.css',
    './css/style.min.css',
    './checkout.component.css'
  ]
})
export class CheckoutComponent implements OnInit, AfterContentInit, AfterContentChecked {

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.initCart();
  }

  ngAfterContentInit() {
    setInterval(() => {}, 30000);
  }

  private initCart() { }
}
