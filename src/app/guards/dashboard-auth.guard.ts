import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';
import { SessValService } from '../services/sess-val.service';
import { CartService } from '../services/cart.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { HttpResponse } from '../interfaces/http-response';
import { ValSessRespProps } from '../interfaces/val-sess-resp-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class DashboardAuthGuard implements CanActivate {
  constructor(
    private _sessVal: SessValService,
    private _users: UsersActiveInactiveService,
    private router: Router,
    private _localStorage: LocalStorageService,
    private _cartService: CartService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role: string = route.data.role;
    const ionstrttl: string = 'ionstr';

    return new Promise((resolve, reject) => {
      let who: string;
      // retrieve userdetails saved in localStorage
      // JSON.parse it
      // unencrypt - optional
      const ions: SessStoreProps[] = JSON.parse(
        this._localStorage.getItem(ionstrttl)
      );;

    console.log({ions});

      const md: string = window.localStorage.getItem('md');

      // if no userdetails reroute to */login
      if (ions !== null && ions !== undefined && ions.length >= 1) {
        // v2 - ions is now an array
        // find active
        const actvUser: SessStoreProps = ions.find((cur) => {
          return cur.active === true;
        });;
        console.log({actvUser});

        actvUser !== undefined && actvUser !== null
          ? (() => {
              // pick sessid
              const {
                id: sessid,
                dt: { accountType, email },
              } = actvUser;

              // validate using sess validator
              // use sess validator
              this._sessVal.valSession(sessid).subscribe(
                (data: ValSessRespProps) => {
                  console.log({data});

                  data.message && accountType === role
                    ? resolve(true)
                    : (() => {
                        who = 'user';
                        this.router.navigate(['shop'], {
                          replaceUrl: true,
                          skipLocationChange: true,
                        });
                        reject(false);
                      })();
                },
                (error: ValSessRespProps) => {
                  // if error.error.message == false
                  // clear such from localStorage;
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
                        this._cartService.clearTempCart();
                        // set next inactive as active
                        this._users.setNextActive();
                      })()
                    : (() => null)();

                    // either way reject false
                    reject(false);
                    this.router.navigate(['admin'], {
                      replaceUrl: true,
                      skipLocationChange: true,
                    });
                }
              );
            })()
          : (() => {
              md === 'user'
                ? (() => {
                    who = 'user';
                    this.router.navigate(['shop'], { replaceUrl: true });
                    reject(false);
                  })()
                : (() => {
                    who = 'admin';
                    this.router.navigate([who, 'login'], { replaceUrl: true });
                    reject(false);
                  })();
            })();
      } else {
        md === 'user'
          ? (() => {
              who = 'user';
              this.router.navigate(['shop'], { replaceUrl: true });
              reject(false);
            })()
          : (() => {
              who = 'admin';
              this.router.navigate([who, 'login'], { replaceUrl: true });
              reject(false);
            })();
      }
    });
  }
}
