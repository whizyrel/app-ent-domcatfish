import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _localStorage: LocalStorageService,
    private _users: UsersActiveInactiveService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const DBName = 'str';
    const ionstrttl = 'ionstr';

    return new Promise((resolve, reject) => {
      const ions: SessStoreProps[] = JSON.parse(
        this._localStorage.getItem(ionstrttl)
      );

      // if ions, resolve false and reroute
      // else resolve true, continue to route
      if (ions !== null && ions !== undefined && ions.length >= 1) {
        let who;
        const md = window.localStorage.getItem('md');

        // users active, grab admin out
        const actvUser = this._users.getUsersActive;
        let isAdmin;
        actvUser !== null &&
        actvUser !== undefined && actvUser.dt.accountType === 'admin'
          ? isAdmin = true
          : isAdmin = false;

        // is logged in at user front and user is logged in at user but is also admin
        md === 'user' && isAdmin === false
          ? (() => {
              who = 'user';
              this.router.navigate(['shop'], {
                replaceUrl: true,
                skipLocationChange: true,
              });
              reject(false);
            })()
          : (() => {
            // is logged in at admin's front and is logged in at user's but user is also an admin
              who = 'admin';
              this.router.navigate([who, 'dashboard'], {
                replaceUrl: false,
                skipLocationChange: false,
              });
              reject(false);
            })();
      } else {
        resolve(true);
      }
    });
  }
}