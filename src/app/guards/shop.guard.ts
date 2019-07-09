import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

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
    private _sessVal: SessValService,
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
        const actvUser: SessStoreProps = ions.find(
          (cur) => cur.active === true
        );
        console.log(actvUser);

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
                  console.log(data);
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
                          ions.filter((cur) => {
                            return cur.active === false;
                          })
                        );

                        // clear person's cart
                        this._cartService.clearCart(email);
                      })()
                    : (() => null)();
                  resolve(true);
                }
              );
            })()
          : null;
      }
      // either way resolve true
      resolve(true);
    });
  }
}
