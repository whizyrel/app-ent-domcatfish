import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { CartService } from '../services/cart.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { DecEncService } from '../services/dec-enc.service';

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
  public checkoutform: FormGroup;
  public cart: CartProps[];
  private activeUser: SessStoreProps;
  public total: number = 0;

  public encURL: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _cartService: CartService,
    private _users: UsersActiveInactiveService,
    private _decEnc: DecEncService
  ) { }

  ngOnInit() {
    this.activeUser = this._users.getUsersActive;
    this.checkoutform = this.formBuilder.group({
      cardnumber: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
      expiry: new FormControl('', [Validators.required]),
    });
  }

  ngAfterContentChecked() {
    this.initCart();
    // this.encURL = this._decEnc.aesEncryption('/shop/checkout');
  }

  ngAfterContentInit() {
    setInterval(() => {}, 10000);
  }

  onSubmit() {

  }

  get status() {
    return this.checkoutform.controls;
  }

  getErrorMessage(): object {
    return {
      cardnumberError: () => {
        if (this.status.cardnumber.hasError) {
          // tslint:disable-next-line:max-line-length
          return this.status.cardnumber.hasError('required')
            ? 'You must fill this field'
            : '';
        }
      },
      cvvError: () => {
        if (this.status.cvv.hasError) {
          return this.status.cvv.hasError('minlength')
            ? 'Field is incomplete'
            : this.status.cvv.hasError('required')
            ? 'You must fill this field'
            : '';
        }
      },
      expiryError: () => {
        if (this.status.expiry.hasError) {
          return this.status.expiry.hasError('minlength')
            ? 'Should be minimum 5 characters long'
            : this.status.expiry.hasError('required')
            ? 'You must fill this field'
            : '';
        }
      },
    };
  }

  disableBtn(): boolean {
    if (
      this.status.cardnumber.value === '' ||
      this.status.cvv.value === '' ||
      (this.status.expiry.value === '' || this.status.email.invalid)
    ) {
      return true;
    }
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
