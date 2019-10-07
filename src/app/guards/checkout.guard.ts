import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private _users: UsersActiveInactiveService,
    private _cartService: CartService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      // there is an active user handler
      // and filled permanent cart
      return new Promise((resolve, reject) => {
        const activeUser = this._users.getUsersActive;
        if (
          activeUser !== null &&
          activeUser !== undefined
        ) {
          const {dt: {email}} = activeUser;

          const cart = this._cartService.getCartItems(email);

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
      });
  }
}
