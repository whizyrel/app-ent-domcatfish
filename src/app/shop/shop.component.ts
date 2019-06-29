import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { GoogleImgService } from '../services/google-img.service';
import { LogoutService } from '../services/logout.service';
import { CartService } from '../services/cart.service';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';
import { PubUserDetails } from '../interfaces/pub-user-details';
import { CartProps } from '../interfaces/cart-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    './shop.component.css',
    './css/style.min.css',
    './css/mdb.min.css',
  ],
})
export class ShopComponent implements OnInit {
  public title = `Debim`.toUpperCase();
  public soc_link: AllLinksProps;
  public links: LinkProps[];

  public what: string = `Logout`;

  public userimg: string;
  public otherusrimg: string;
  public username: string;

  public active: SessStoreProps;
  public inactive: SessStoreProps[] | SessStoreProps;

  public showActvUser: boolean;
  public showInactvUser: boolean;

  public cart: CartProps[] = [];

  constructor(
    private router: Router,
    private _linksService: LinksService,
    private _users: UsersActiveInactiveService,
    private _googleApi: GoogleImgService,
    private _logUserOut: LogoutService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();

    this.initActive();
    this.initInactive();
  }

  initActive() {
    this.active = this._users.getUsersActive;
    this.active !== undefined &&
    this.active !== null &&
    !Array.isArray(this.active)
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
          this.username = `Your name`;
        })();
  }

  initInactive() {
    this.inactive = this._users.getUsersInactive;

    this.inactive['length'] >= 1
      ? (() => {
          this.showInactvUser = true;
          this.inactive['forEach']((cur) => {
            this._googleApi.getUserImg(cur.dt.email).subscribe(
              (data) => {
                cur.dt.img = `./assets/images/avatar3.png`;
              },
              (error) => {
                cur.dt.img = `./assets/images/avatar2.png`;
              }
            );
          });
        })()
      : (() => {
          this.showInactvUser = false;
          this.otherusrimg = `./assets/images/avatar3.png`;
        })();
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

  addToCart() {
    // must not add to
  }
  checkout() {
    // if cart is empty disable Proceed to checkout button
  }
}
