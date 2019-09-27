import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { SessValService } from '../services/sess-val.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';

import { ValSessRespProps } from '../interfaces/val-sess-resp-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class ShopGuard implements CanActivate {
  constructor(
    private router: Router,
    private _sessVal: SessValService,
    private _users: UsersActiveInactiveService,
    private _localStorage: LocalStorageService,
    private _cartService: CartService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const ionstrttl = 'ionstr';
      // get ssid
      const ions = JSON.parse(this._localStorage.getItem(ionstrttl));

      if (ions !== null && ions !== undefined && ions.length !== 0) {
        // v2 - ions is now an array
        // filter active
        // pick sessid

        // implemented active user and undefined check below
        // use usersActive... service
        const actvUser: SessStoreProps = this._users.getUsersActive;

        actvUser !== null && actvUser !== undefined
          ? (() => {
              // validate using sess validator
              // use sess validator
              // resolve true: the idea is to clear localStorage on error or expiry

              const {
                id: sessid,
                dt: { accountType, email },
              } = actvUser;

              this._sessVal.valSession(sessid).subscribe(
                (data: ValSessRespProps) => {
                  data.message === true ? resolve(true) : resolve(true);
                },
                (error: ValSessRespProps) => {
                  // if error.error.message == false
                  // clear such from localStorage;
                  // also clear user's cart
                  error.error.message === false
                    ? (() => {
                        // clear session
                        this._localStorage.setItem(
                          ionstrttl,
                          this._users.getUsersInactive
                        );

                        // clear person's cart
                        this._cartService.clearCart(email);
                        this._cartService.clearTempCart();
                        // set next Active before logout
                        this._users.setNextActive();

                        // if checkout route, and checkout guard validation imp is false, back to shop
                        this.isCheckoutRoute(state, resolve, reject);
                      })()
                    : (() => null)();
                  resolve(true);
                }
              );
            })()
          : resolve(true);
      } else {
        // either way resolve true
        resolve(true);
      }
    });
  }

  private isCheckoutRoute(s, resolve, reject) {
    console.log({s: s.url});
    if (s.url.split('/').includes('checkout')) {
      const activeUser = this._users.getUsersActive;
      if (
        activeUser !== null &&
        activeUser !== undefined
      ) {
        const {dt: {email}} = activeUser;

        const cart = this._cartService.getCartItems(email);
        console.log('[checkout guard]', {cart});

        if (cart !== null && cart !== undefined) {
          if (cart.length > 0) {
            resolve(true);
          } else {
            reject(false);
            this.router.navigate(['shop']);
          }
        } else {
          reject(false);
          // route
          this.router.navigate(['shop']);
        }
      } else {
        reject(false);
        // route
        this.router.navigate(['shop']);
      }
    }
  }
}
