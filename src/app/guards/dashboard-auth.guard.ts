import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

// import { IndexedDBService } from '../services/indexed-db.service';
import { SessValService } from '../services/sess-val.service';

import { HttpResponse } from '../interfaces/http-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardAuthGuard implements CanActivate {
  private db: any;
  constructor(
    private _sessVal: SessValService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role = route.data.role;
    const DBName = 'str';
    const ionstrttl = 'ionstr';

    console.log(role);

    return new Promise((resolve, reject) => {
      let who;
      // retrieve userdetails saved in localStorage
      // JSON.parse it
      // unencrypt - optional
      const ions = JSON.parse(window.localStorage.getItem(ionstrttl)); // Buffer.from(ions).toString()
      console.log(ions);
      const md = window.localStorage.getItem('md');

      // if no userdetails reroute to */login
      if (ions !== null && ions !== undefined) {
        // validate using sess validator
        // pick sessid
        const { sessid, accountType } = ions;
        // use sess validator
        this._sessVal.valSession(sessid).subscribe(
          (data: HttpResponse) => {
            console.log(data);
            data.message && accountType === role ?
            resolve(true) :
            (() => {
                who = 'user';
                this.router.navigate(['shop']);
                reject(false);
              })();
          },
          (error) => {
            console.log(error);
            md === 'user'
              ? (() => {
                  who = 'user';
                  this.router.navigate(['shop']);
                  reject(false);
                })()
              : (() => {
                  who = 'admin';
                  this.router.navigate([who, 'login']);
                  reject(false);
                })();
          }
        );
      } else {
        md === 'user'
          ? (() => {
              who = 'user';
              this.router.navigate(['shop']);
              reject(false);
            })()
          : (() => {
              who = 'admin';
              this.router.navigate([who, 'login']);
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
