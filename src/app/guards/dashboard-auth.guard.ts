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

import { HttpResponse } from '../interfaces/http-response';
import { ValSessRespProps } from '../interfaces/val-sess-resp-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class DashboardAuthGuard implements CanActivate {
  constructor(
    private _sessVal: SessValService,
    private router: Router,
    private _localStorage: LocalStorageService,
    private _cartService: CartService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role: string = route.data.role;
    const DBName: string = 'str';
    const ionstrttl: string = 'ionstr';

    return new Promise((resolve, reject) => {
      let who: string;
      // retrieve userdetails saved in localStorage
      // JSON.parse it
      // unencrypt - optional
      const ions: SessStoreProps[] = JSON.parse(
        this._localStorage.getItem(ionstrttl)
      );

      console.log(ions);

      const md = window.localStorage.getItem('md');

      // if no userdetails reroute to */login
      if (ions !== null && ions !== undefined && ions.length !== 0) {
        // v2 - ions is now an array
        // filter active
        // pick sessid
        const {
          id: sessid,
          dt: { accountType, email },
        } = ions.filter((cur) => {
          return cur.active === true;
        })[0];

        // validate using sess validator
        // use sess validator
        this._sessVal.valSession(sessid).subscribe(
          (data: ValSessRespProps) => {
            console.log(data);
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
                })()
              : (() => null)();
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
        );
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

      // const {id} = objReq.result[0];
      // console.log(id);
      // if (!id) {
      //   this.router.navigate(['admin/login']);
      //   reject(false);
      // } else {
      //   // use idb val and sess val
      //   this._sessVal.valSession(id).subscribe(
      //   (data: HttpResponse) => {
      //     data.message ?
      //     resolve(true) : (() => {
      //       this.router.navigate(['admin/login']);
      //       reject(false);
      //     })();
      //   }, (error) => {
      //     console.log(error.error.message);
      //     this.router.navigate(['admin/login']);
      //     reject(false);
      //   });
    });
  }
}

// window.indexedDB
// .open(DBName).onsuccess = (event) => {
//   this.db = event.target;
//   const db = this.db.result;
//   const objectStore = db.transaction(ionidstrttl).objectStore(ionidstrttl);
//   const objReq = objectStore.getAll();
//   objReq.onsuccess = () => {
//
//     }
//   };
// };
