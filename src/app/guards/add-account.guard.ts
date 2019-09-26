import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root'
})
export class AddAccountGuard implements CanActivate {
  constructor (
    private _users: UsersActiveInactiveService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      // get user active, pay attention to null and undefined case
      const actvUser: SessStoreProps = this._users.getUsersActive;

      if (actvUser !== null && actvUser !== undefined) {
        resolve(true);
      } else {
        reject(false);
        // route to X
        state.url.split('/').includes('user') === true
          ? this.router.navigate(['shop'], {skipLocationChange: true})
          : this.router.navigate(['admin', 'login']/*, {
            skipLocationChange: true
          }*/);
      }
    });
  }
}
