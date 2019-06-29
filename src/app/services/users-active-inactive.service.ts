import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersActiveInactiveService {
  constructor(private _localStorage: LocalStorageService) {}

  protected get getUsersOnline() {
    const ionstrttl = 'ionstr';

    const users = this._localStorage.getItem(ionstrttl);
    return JSON.parse(users);
  }

  get getUsersActive() {
    const users = this.getUsersOnline;
    // returns an object
    return users === undefined || users === null || users.length < 1
      ? []
      : users.find((cur) => {
          return cur.active === true;
        });
  }

  get getUsersInactive() {
    const users = this.getUsersOnline;
    // returns an array
    return users === undefined || users === null || users.length < 1
      ? []
      : users.filter((cur) => {
          return cur.active === false;
        });
  }
}
