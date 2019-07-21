import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';
import { APIURLService } from './apiurl.service';
import { UsersActiveInactiveService } from './users-active-inactive.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private _localStorage: LocalStorageService, private apiUrls: APIURLService, private _httpClient: HttpClient, private _activeInactiveUsers: UsersActiveInactiveService) {}
  logout() {
    const ionstrttl = 'ionstr';

    const active = this._activeInactiveUsers.getUsersActive;

    if (active !== null && active !== undefined) {
      const { id } = active;

      // go to backend
      this.logoutUserBackend(id).subscribe(data => {
        console.log(`[Success] logout successful`);

        const inactive = this._activeInactiveUsers.getUsersInactive;

        this._localStorage.setItem(ionstrttl, inactive);
      }, error => {
        console.log(`[error] logging out ${error}`);
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
