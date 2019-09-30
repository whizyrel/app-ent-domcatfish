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
  private seckey: string = 'app-ent-domcatfish';

  public submitted: boolean = false;

  public cardMaxLength: number;
  public fullname: string;
  public address: string;
  private showSpinner: boolean = false;
  private cardnumber: number[] = [];
  private str: string = '';

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
    this.fullname = `${this.activeUser.dt.firstname} ${this.activeUser.dt.lastname}`;
    this.address = this.activeUser.dt.address;

    this.checkoutform = this.formBuilder.group({
      client: new FormControl(this.fullname, [Validators.required]),
      address: new FormControl(this.address, [Validators.required]),
      cardnumber: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
      month: new FormControl('', [Validators.required, Validators.minLength(2)]),
      year: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.encURL = this._decEnc.aesEncryption('/shop/checkout');
  }

  ngAfterContentChecked() {
    this.initCart();
  }

  ngAfterContentInit() {
    setInterval(() => {}, 10000);
  }

  onSubmit() {
    this.showSpinner = true;
    const details = {};
    if (this.checkoutform.valid && this.submitted === false) {
      console.log({r: this.checkoutform.getRawValue()});

      // this.submitted = true;
      setTimeout(() => this.showSpinner = false, 15000);
      // this.showSpinner = false, 15000
    }
  }

  formatCardNumber(e, f) {
    // this.cardnumber.push(parseInt(e.key));
    // setTimeout(() => {
    //   if (this.cardnumber['length'] % 4 === 0) {
    //     this.str += `${this.cardnumber.join('')} `;
    //     /* if (this.cardnumber['length'] > 4) {
    //       (str.replace(' ', '').length);
    //     } */
    //     f.value = this.str;
    //   }
    //
    //   if (this.cardnumber['length'] === f.maxLength) {
    //     this.str += `${this.cardnumber['splice'](this.cardnumber['length'] % 4)}`;
    //     f.value = this.str;
    //   }
    //   console.log({c: this.cardnumber, s: this.str, v: f.value});
    // }, 1000);
  }

  validateInput(e) {
    const val = parseInt(e.key);
    const keyCodeArr = [8, 9, 16, 17, 37, 38, 39, 40, 46, 51];
    const kc = e.keyCode || e.which;
    const isValid = Number.isInteger(val);

    if (isValid === false) {
        if (keyCodeArr.includes(kc) === false) e.preventDefault();
    }
  }

  showField(d, f, fb, sb) {
    d.classList.toggle('d-none');
    f.classList.toggle('d-none');
    fb._elementRef.nativeElement.classList.toggle('d-none');
    sb._elementRef.nativeElement.classList.toggle('d-none');

    this.fullname = this.status.client.value;
    this.address = this.status.address.value;
  }

  handleField(p, n) {
    if (p.value.length === p.maxLength) {
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
      this.status.client.value === '' || this.status.client.invalid ||
      this.status.address.value === '' || this.status.address.invalid ||
      this.status.cardnumber.value === '' || this.status.cardnumber.invalid ||
      this.status.cvv.value === '' || this.status.cvv.invalid ||
      this.status.month.value === '' || this.status.month.invalid ||
      this.status.year.value === '' || this.status.year.invalid
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

  public deleteFromCart(e, pid: string) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this._cartService.deleteFromTempCart(pid);
    this.initCart();
  }

  showFullDetails(id: string) {
    const encID = this._decEnc.aesEncryption(id, this.seckey);
    this.router.navigate(['/shop/view/'], {queryParams: {st: encID}});
  }

  private calcTotal() {
    this.total = this.cart.reduce((acc, cur) => acc + cur.price, 0);
  }
}
