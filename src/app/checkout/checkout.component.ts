import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';

import { CartService } from '../services/cart.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { CartStoreProps } from '../interfaces/cart-store-props';
import { CartProps } from '../interfaces/cart-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

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
  public cart: CartProps[];
  private activeUser: SessStoreProps;
  public total: number = 0;

  constructor(
    private _cartService: CartService,
    private _users: UsersActiveInactiveService
  ) { }

  ngOnInit() {
    this.activeUser = this._users.getUsersActive;
  }

  ngAfterContentChecked() {
    this.initCart();
  }

  ngAfterContentInit() {
    setInterval(() => {}, 5000);
  }

  private initCart() {
    if (this.activeUser !== null && this.activeUser !== null) {
      this.cart = this._cartService.getCartItems(this.activeUser.dt.email);
    }
    this.calcTotal();
  }

  public deleteFromCart(pid: string) {
    console.log({pid});
  }

  private calcTotal() {
    this.total = this.cart.reduce((acc, cur) => acc + cur.price, 0);
  }
}
