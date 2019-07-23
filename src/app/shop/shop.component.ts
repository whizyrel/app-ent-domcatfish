import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PageEvent} from '@angular/material';

import { AES, enc } from 'crypto-js';

import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { GoogleImgService } from '../services/google-img.service';
import { LogoutService } from '../services/logout.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductsService } from '../services/products.service';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';
import { PubUserDetails } from '../interfaces/pub-user-details';
import { CartProps } from '../interfaces/cart-props';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    './css/style.min.css',
    './css/mdb.min.css',
    './shop.component.css',
  ],
})
export class ShopComponent implements OnInit {
  public title = `Debim`.toUpperCase();
  public soc_link: AllLinksProps;
  public links: LinkProps[];
  public types: string[];

  public what: string = `Logout`;

  public encURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  public userimg: string;
  public otherusrimg: string;
  public username: string;

  public active: SessStoreProps;
  public inactive: SessStoreProps[];

  public showActvUser: boolean;
  public showInactvUser: boolean;

  public cart: CartProps[] = [];

  public length: number;
  public pageSize: number;
  public pageSizeOptions;
  // MatPaginator Output
  public pageEvent: PageEvent;

  public productsList: ProductsProps[][];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _linksService: LinksService,
    private _users: UsersActiveInactiveService,
    private _googleApi: GoogleImgService,
    private _logUserOut: LogoutService,
    private _cartService: CartService,
    private _localStorage: LocalStorageService,
    private _productsService: ProductsService
  ) {}

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();
    this.types = this._linksService.getTypes();

    this.pageSize = 4;
    // this.getProducts();

    this.initActive();
    this.initInactive();

    // console.log(this.activatedRoute.pathFromRoot.toString());
    this.encURL = AES.encrypt('/shop', this.seckey);
  }

  addToCart() {
    // must not add to
  }

  checkout() {
    // if cart is empty disable Proceed to checkout button
  }

  protected getProducts () {
    this._productsService.getProductList.subscribe((data: HttpResponse) => {
      console.log(`[Success]`);
      console.log(data);
      this.productsList = this.splitProductsList(data.docs);

      this.length = this.productsList.length;
      }, (error: HttpResponse) => {
      console.log(`[Error]`);
      console.log(error);
    });
  }

  protected splitProductsList(data) {
    const arrayList = [];

    data.forEach((cur, i) => {
      const buff = [];
      while ((arrayList.length <= Math.trunc(arrayList.length/4) /*|| arrayList[i].length !== undefined*/) && i < data.length) {
        buff.push(cur);
        arrayList.push((buff));
      }
    });

    console.log(arrayList);

    return arrayList;
  }

  initActive() {
    // type mismatch
    !Array.isArray(this._users.getUsersActive)
      ? (this.active = this._users.getUsersActive)
      : null;

    this.active !== undefined &&
    this.active !== null &&
    Array.isArray(this.active) === false
      ? (() => {
          const {
            dt: { firstname, lastname, email },
          } = this.active;

          this.what = `Logout`;
          this.showActvUser = true;
          this.username = `${firstname} ${lastname
            .substring(0, 1)
            .toUpperCase()}.`;

          this._googleApi.getUserImg(email).subscribe(
            (data) => {
              // pick image from success response from google api
              this.userimg = '';
            },
            (error) => {
              this.userimg = `./assets/images/avatar2.png`;
            }
          );

          this.cart = this._cartService.getCartItems(email);
        })()
      : (() => {
          this.what = `Sign in`;
          this.showActvUser = false;
          this.userimg = `./assets/images/user2-160x160.jpg`;
          this.username = ``;
        })();
  }

  initInactive() {
    console.log(this._users.getUsersInactive.length);

    // type mismatch
    if (
      this._users.getUsersInactive.length >= 1 &&
      this._users.getUsersInactive !== null &&
      this._users.getUsersInactive !== undefined
    ) {
      this.inactive = this._users.getUsersInactive;
      console.log(this.inactive);

      this.inactive.length >= 1 &&
      this.inactive !== null &&
      this.inactive !== undefined
        ? (() => {
            this.showInactvUser = true;
            this.inactive['forEach']((cur) => {
              this._googleApi.getUserImg(cur.dt.email).subscribe(
                (data) => {
                  // put user img in active-false users in ionstore
                  cur.dt.img = `./assets/images/avatar3.png`;

                  // temporary use
                  this.otherusrimg = `./assets/images/avatar3.png`;
                },
                (error) => {
                  cur.dt.img = `./assets/images/avatar2.png`;

                  // temporarily use
                  this.otherusrimg = `./assets/images/avatar3.png`;
                }
              );
            });
          })()
        : (() => {
            this.showInactvUser = false;
            // other user image not needed
            // this.otherusrimg = `./assets/images/avatar3.png`;
          })();
    } else {
      this.showInactvUser = false;
    }
  }

  inOutCtrl() {
    console.log(this.showActvUser);
    this.showActvUser === true
      ? (() => {
          // log user out
          // log user out procedure
          // clear cart on logout

          const {
            dt: { email },
          } = this.active;

          this._cartService.clearCart(email);
          this._logUserOut.logout();

          // set next Active before logout
          this._users.setNextActive();

          // synchronize users and cart tabs
          this.initActive();
          this.initInactive();
        })()
      : (() => {
          // route to login page
          this.router.navigate(['user/login'], {
            skipLocationChange: false,
            replaceUrl: false,
          });
        })();
  }
}
