import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

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

  public submitted: boolean = false;
  public hideForm: boolean = true;

  public cardMaxLength: number;
  public fullname: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _cartService: CartService,
    private _users: UsersActiveInactiveService,
    private _decEnc: DecEncService
  ) { }

  ngOnInit() {
    this.activeUser = this._users.getUsersActive;
    console.log({n: this.activeUser});

    this.fullname = `${this.activeUser.dt.firstname} ${this.activeUser.dt.lastname}`;

    this.checkoutform = this.formBuilder.group({
      client: new FormControl(this.fullname, [Validators.required]),
      address: new FormControl(this.activeUser.dt.address, [Validators.required]),
      cardnumber: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
      expiry: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required, Validators.minLength(2)]),
      year: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    const details = {};
    if (this.checkoutform.valid && this.submitted === false) {
      console.log({r: this.checkoutform.getRawValue()});
    }
  }

  showForm(f) {

  }

  handleCardNumber(p, n) {
    console.log({p, n});
    if (p.value.length === p.maxLength) {
      n.focus();
    }
  }

  handleMonth(p, n) {
    console.log({p, n});
    if (p.value.length === p.maxLength) {
      n.focus();
    }
  }

  handleYear(p, n) {
    console.log({p, n});
    if (p.value.length === p.maxLength) {
      n.focus();
    }
  }

  handleCVV(p, n) {
    console.log({p, n});
    if (p.value.length === p.maxlength) {
      n.focus();
    }
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
            ? 'these numbers are required'
            : '';
        }
      },
      cvvError: () => {
        if (this.status.cvv.hasError) {
          return this.status.cvv.hasError('minlength')
            ? 'these numbers are required'
            : this.status.cvv.hasError('required')
              ? 'this field is required'
              : '';
        }
      },
      monthError: () => {
        if (this.status.month.hasError) {
          return this.status.month.hasError('minlength')
            ? 'expiry is required'
            : this.status.month.hasError('required')
              ? 'this field is required'
              : '';
        }
      },
      yearError: () => {
        if (this.status.year.hasError) {
          return this.status.year.hasError('minlength')
            ? 'expiry is required'
            : this.status.year.hasError('required')
              ? 'this field is required'
              : '';
        }
      },
      clientError: () => {
        if (this.status.client.hasError) {
          return this.status.client.hasError('required')
              ? 'this field is required'
              : '';
        }
      },
      addressError: () => {
        if (this.status.address.hasError) {
          return this.status.address.hasError('required')
              ? 'this field is required'
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
    if (this.activeUser !== null && this.activeUser !== undefined) {
      this.cart = this._cartService.getCartItems(this.activeUser.dt.email);
      if (this.cart['length'] < 1) {
        // route out to shop
        this.router.navigate(['shop']);
      }
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
