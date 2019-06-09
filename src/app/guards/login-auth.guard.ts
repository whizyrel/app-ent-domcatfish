import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// import { IndexedDBService } from '../services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    // private _indexedDB: IndexedDBService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const DBName = 'str';
    const ionstrttl = 'ionstr';

    return new Promise((resolve, reject) => {
      const ions = window.localStorage.getItem(ionstrttl);
      console.log(ions);
      // if ions resolve false and reroute
      // else resolve true, continue to route
      if (ions !== null && ions !== undefined) {
        let who;
        const md = window.localStorage.getItem('md');
        console.log(md);
        md === 'user' ?
        (() => {
          who = 'user';
          this.router.navigate(['shop']);
          reject(false);
        })() :
          (() => {
            who = 'admin';
            this.router.navigate([who, 'dashboard']);
            reject(false);
          })();
      } else {
        resolve(true);
      }
    });
  }
}

// using indexedDB
// db: any;
// let count;
// const dbOpenReq = window.indexedDB.open(DBName, 1);
// dbOpenReq.onsuccess = (event) => {
//   this.db = event.target;
//   const db = this.db.result;
//   console.log();
//   db.onerror = () => {
//     resolve(true);
//   };
//   if (Array.from(db.objectStoreNames).includes(ionidstrttl)) {
//     const idbTransaction = db.transaction(ionidstrttl);
//
//     // be weary of this below
//     idbTransaction.onerror = () => {
//       resolve(true);
//     };
//     // ends here
//
//     idbTransaction.oncomplete = () => {
//       const objectStore = idbTransaction.objectStore(ionidstrttl);
//       // be weary of this below
//       objectStore.onerror = () => {
//         resolve(true);
//       };
//       // ends here
//
//       const countRequest = objectStore.count();
//       countRequest.onsuccess = () => {
//         count = countRequest.result;
//         console.log(count);
//         if (count === 1 || count >= 1) {
//           let who = '';
//           const md = window.localStorage.getItem('md');
//           console.log(md);
//           md === 'user' ?
//           (() => {
//             who = 'user';
//             this.router.navigate(['shop']);
//             reject(false);
//           })() :
//             (() => {
//               who = 'admin';
//               this.router.navigate([who, 'dashboard']);
//               reject(false);
//             })();
//         } else {
//           resolve(true);
//         }
//       };
//     };
//   } else {
//     resolve(true);
//   }
// };
