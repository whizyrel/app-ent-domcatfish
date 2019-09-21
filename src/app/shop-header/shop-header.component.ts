import { Component, OnInit, AfterContentChecked, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';

import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { GoogleImgService } from '../services/google-img.service';
import { LogoutService } from '../services/logout.service';
import { CartService } from '../services/cart.service';
import { DecEncService } from '../services/dec-enc.service';
import { DialogService } from '../services/dialog.service';

import { CartProps } from '../interfaces/cart-props';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: [
    './css/style.min.css',
    './css/mdb.min.css',
    './shop-header.component.css',
  ]
})
export class ShopHeaderComponent implements OnInit, AfterContentChecked {
  @Input('url') public encURL: string;

  public title = `Debim`.toUpperCase();

  public what: string = `Logout`;

  public userimg: string;
  public otherusrimg: string;
  public username: string;

  public active: SessStoreProps;
  public inactive: SessStoreProps[];

  public showActvUser: boolean;
  public showInactvUser: boolean;

  public cart: CartProps[] = [];
  private seckey: string = 'app-ent-domcatfish';
  public encID: string;
  public bool: boolean = false;

  constructor(
    private router: Router,
    private _linksService: LinksService,
    private _users: UsersActiveInactiveService,
    private _googleApi: GoogleImgService,
    private _logUserOut: LogoutService,
    private _cartService: CartService,
    public dialog: MatDialog,
    public _dialog: DialogService,
    private _decEnc: DecEncService
  ) { }

  ngOnInit() {
    this.initActive();
    this.initInactive();
    // this.initCart();
  }

  ngAfterContentChecked() {
    // if (
    //   this.cart.length >= 1
    // ) {
      this.initCart();
      // this.initActive();
    // }
  }

  public checkout() {
    const activeUsers = this._users.getUsersActive;
    console.log({activeUsers});

    if (activeUsers === null) {
      this._dialog.showDialog({
        message: 'Please log in to continue'
      }, '300px', () => {
        // route to login
        // consider return url
        this.router.navigate(['/user', 'login'], {
          queryParams: {
            rt: this.encURL,
          },
          replaceUrl: true,
        });
      });
    } else {
      // move to active users' carts
      // clear temp cart
      // show dialog
      // construct order - last
      this._cartService.clearTempCart();
    }
  }

  public deleteFromCart(e, id: string) {
    console.log({e, id});
    e.stopPropagation();
    e.stopImmediatePropagation();
    this._cartService.deleteFromTempCart(JSON.parse(id));
    this.initCart();
  }

  private initCart () {
    this.cart = this._cartService.getTempCartItems;
    console.log({cart: this.cart});
  }

  public showFullDetails(id) {
    const encID = this._decEnc.aesEncryption(id, this.seckey);
    this.router.navigate(['/shop/view/'], {queryParams: {st: encID}});
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
  }

  private initActive() {
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
            (data: HttpResponse) => {
              // pick image from success response from google api
              this.userimg = '';
            },
            (error: HttpResponse) => {
              // this.userimg = `./assets/images/avatar2.png`;
            }
          );

          this.initCart();
        })()
      : (() => {
          this.what = `sign in`;
          this.showActvUser = false;
          // this.userimg = `./assets/images/user2-160x160.jpg`;
          this.username = ``;
        })();
  }

  private initInactive() {
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
                (data: HttpResponse) => {
                  // put user img in active-false users in ionstore
                  cur.dt.img = `./assets/images/avatar3.png`;

                  // temporary use
                  // this.otherusrimg = `./assets/images/avatar3.png`;
                },
                (error: HttpResponse) => {
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
            queryParams: {
              rt: this.encURL,
            },
          });
        })();
  }
}
