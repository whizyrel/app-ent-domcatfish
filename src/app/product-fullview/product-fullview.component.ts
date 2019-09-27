import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DecEncService } from '../services/dec-enc.service';
import { ProductsService } from '../services/products.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { DialogService } from '../services/dialog.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { InitSnackbarService } from '../services/init-snackbar.service';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { ProductsProps } from '../interfaces/products-props';
import { CartProps } from '../interfaces/cart-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-product-fullview',
  templateUrl: './product-fullview.component.html',
  styleUrls: [
    './css/mdb.min.css',
    './css/style.min.css',
    './product-fullview.component.css',
  ]
})
export class ProductFullviewComponent implements OnInit {
  private seckey: string = 'app-ent-domcatfish';

  private pid: string;
  public imgs: string[];
  public info: ProductsProps;
  private total: number = 0;

  public encURL: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _decEnc: DecEncService,
    private _productsService: ProductsService,
    private _localStorage: LocalStorageService,
    private _cartService: CartService,
    private _dialog: DialogService,
    private _users: UsersActiveInactiveService,
    private _snackbar: InitSnackbarService
  ) { }

  async ngOnInit() {
    await this.activatedRoute.queryParams.subscribe(async (param) => {
      const { st } = param;
      this.pid = this._decEnc.aesDecryption(st.toString(), this.seckey);
      await this.getProductDetails(this.pid);
      this.encURL = this._decEnc.aesEncryption(`/shop/view?st=${this.pid}`, this.seckey);
    });
  }

  async getProductDetails(id: string) {
    await this._productsService
    .getProductDetails(id)
    .subscribe(
      async (data: HttpResponse) => {
        this.info = await data.doc;
        this.imgs = data.doc.imgs;
      },
      (error: HttpResponse) => {
        console.error({error});
        // show modal
      }
    );
  }

  addToCart(qty: string) {
    this
      ._snackbar
      .showSnackBarFromComponent(
        SnackbarmsgComponent,
        'click the cart icon to view cart and checkout/pay',
        15000
      );
    const cartInfo: CartProps = {
      quantity: parseInt(qty),
      price: this.info.price,
      PID: this.pid,
      imgs: this.info.imgs,
      title: this.info.title,
    };

    this._cartService.addToTempCart(cartInfo);
    this._dialog.showDialog({
      message: 'Would you like to checkout/pay?',
      close: true,
      action: () => {
        // route to login
        // consider return url
        this.checkout();
      },
    }, '300px');
  }

  private checkout() {
    const activeUser = this._users.getUsersActive;
    this.encURL = this._decEnc.aesEncryption(`/shop/checkout`, this.seckey);

    if (activeUser === null) {
      this._dialog.showDialog({
        message: 'Please log in/signup to continue',
        action: () => {
          this.router.navigate(['/user', 'login'], {
            queryParams: {
              rt: this.encURL,
            },
            replaceUrl: true,
          });
        }
      }, '300px');
    } else {
      // move to active users' carts
      // clear temp cart
      // route to checkout page
      this.router.navigate(['/shop', 'checkout']);
    }
  }
}
