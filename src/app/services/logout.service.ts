import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { CartService } from './cart.service';
import { APIURLService } from './apiurl.service';
import { UsersActiveInactiveService } from './users-active-inactive.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private _localStorage: LocalStorageService,
    private apiUrls: APIURLService,
    private _httpClient: HttpClient,
    private _users: UsersActiveInactiveService,
    private _cartService: CartService,
  ) {}

  // using callbacks to fix asynchronous mismatch
  // high-end function
  async logout(cb) {
    const ionstrttl = 'ionstr';
    let err;
    let done;

    const active = this._users.getUsersActive;

    if (active !== null && active !== undefined) {
      const { id, dt: {email} } = active;

      // go to backend
      await this.logoutUserBackend(id)
      .subscribe(async data => {
        console.log(`[Success] logout successful`);

        // clear cart
        this._cartService.clearCart(email);
        this._cartService.clearTempCart();
        // inactive users
        const inactive = this._users.getUsersInactive;

        // set inactive users
        this._localStorage.setItem(ionstrttl, inactive);

        done = true;
        err = null;
        await cb(err, done);
      }, async error => {
        done = null;
        cb(error, done);
      });
    }
  }

  protected logoutUserBackend(token: string): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = this.apiUrls.userUrls.logout;

    return this._httpClient.put<Object>(_url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
