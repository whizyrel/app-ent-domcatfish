import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AES, enc } from 'crypto-js';

import { ProductsHandler } from '../common/products-handler';

import { DialogComponent } from '../dialog/dialog.component';

import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { GoogleImgService } from '../services/google-img.service';
import { LogoutService } from '../services/logout.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductsService } from '../services/products.service';
import { DecEncService } from '../services/dec-enc.service';

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

  // MatPaginator Output
  public pageIndex: number = 0;
  public pageSize: number = 3;
  // public pageEvent: PageEvent;

  public prodList: ProductsProps[][];
  public currProdList: ProductsProps[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _linksService: LinksService,
    private _users: UsersActiveInactiveService,
    private _googleApi: GoogleImgService,
    private _logUserOut: LogoutService,
    private _cartService: CartService,
    private _productsService: ProductsService,
    private productsHandler: ProductsHandler,
    private _decEnc: DecEncService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();
    this.types = this._linksService.getTypes();

    this.initActive();
    this.initInactive();

    this.encURL = this._decEnc.aesEncryption('/shop', this.seckey);
  }

  setPageSize(e) {
    this.pageSize = parseInt(e.target.value) || this.pageSize;
    setTimeout(() => this.getProducts(null), 1500);
  }

  switchCategory(type) {
    console.log({type});
    this.getProducts(type);
  }

  private getProducts(status) {
    this._productsService
    .getProductList
    .subscribe(
      (data: HttpResponse) => {
        this.productsHandler.splitProducts(
          status === null || status === 'All'
            ? data.docs
            : (data.docs).map(cur => {
              if (cur.pack === status) {return cur;}
            }),
          this.pageSize,
          (err, resp) => {
            if (err) {
              console.error({err});
              return;
            }
            this.prodList = resp;
            this.currProdList = resp[resp.length - resp.length];
          }
        );
      },
      error => {
        console.error({error});
      }
    );

    window.onpageshow = () => this.togglePaginators('left');
  }

  private get pageButtons() {
    return {
      left: document.querySelector('#l-pg'),
      right: document.querySelector('#r-pg')
    }
  }

  public pageHandler(i: number) {
    const right = this.pageButtons.right;
    const left = this.pageButtons.left;
    console.log({i});
    // use length instead

    if (i >= 0 && this.pageIndex < this.prodList.length) {
      this.currProdList = this.prodList[++this.pageIndex];
      if (left.classList.contains('d-none')) this.togglePaginators('left');
    }

    if (i < 0 && this.pageIndex > 0) {
      this.currProdList = this.prodList[--this.pageIndex];
      if (right.classList.contains('d-none')) this.togglePaginators('right');
    }
    // toggle
    if (this.pageIndex === this.prodList.length - 1) this.togglePaginators('right');
    if (this.pageIndex === 0) this.togglePaginators('left');
  }

  private togglePaginators(side: string) {
    const right = this.pageButtons.right;
    const left = this.pageButtons.left;
    if (side === 'left') {
      left.classList.toggle('d-none');
    }
    if (side === 'right') {
      right.classList.toggle('d-none');
    }
  }

  oneClickLogin(el, e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    // grap selected user index in session store
    const i = parseInt(el.id.split('-')[1]);
    console.log(this._users.getUsersActive);
    this._users.switchUser(i);
    this.initActive();
    this.initInactive();
    // console.log({el, e, i});
  }

  initActive() {
    // type mismatch
    !Array.isArray(this._users.getUsersActive)
      ? (this.active = this._users.getUsersActive)
      : null;

      console.log({active: this.active});

    this.active !== undefined &&
    this.active !== null &&
    Array.isArray(this.active) === false
      ? (() => {
          const {
            dt: { firstname, lastname, email },
          } = this.active;

          this.what = `sign out`;
          this.showActvUser = true;
          this.username = `${firstname} ${
            lastname.substring(0, 1)
            .toUpperCase()}${
              lastname.substring(1
              )}`;

          this._googleApi.getUserImg(email).subscribe(
            (data) => {
              // pick image from success response from google api
              this.userimg = '';
            },
            (error) => {
              // this.userimg = `./assets/images/avatar2.png`;
            }
          );

          this.cart = this._cartService.getCartItems(email);
        })()
      : (() => {
          this.what = `sign in`;
          this.showActvUser = false;
          // this.userimg = `./assets/images/user2-160x160.jpg`;
          this.username = ``;
        })();

    // let getProducts hide here
    this.getProducts(null);
  }

  initInactive() {
    // type mismatch
    if (
      this._users.getUsersInactive.length >= 1 &&
      this._users.getUsersInactive !== null &&
      this._users.getUsersInactive !== undefined
    ) {
      this.inactive = this._users.getUsersInactive;
      console.log({inactive: this.inactive});

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
                  // this.otherusrimg = `./assets/images/avatar3.png`;
                },
                (error) => {
                  cur.dt.img = `./assets/images/avatar2.png`;

                  // temporarily use
                  // this.otherusrimg = `./assets/images/avatar3.png`;
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

  async inOutCtrl() {
    // console.log(this.showActvUser);
    this.showActvUser === true
      ? (async () => {
          // log user out
          // log user out procedure
          // log out backend and put replace all with inactive users...
          // make async beyond present await implementation
          await this._logUserOut.logout(async (err, done) => {
            console.log({err, done});

            if (err) {
              console.log(`[error] logging out`, {err});
              // show dialog
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '250px',
                data: {error: err}
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
              return;
            }
            // set next Active before logout
            await this._users.setNextActive();

            // synchronize users and cart tabs
            await this.initActive();
            await this.initInactive();

            // route to shop - self, tentative
            this.router.navigate(['/shop'], {
              skipLocationChange: false,
              replaceUrl: false,
            });
          });
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
