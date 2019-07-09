import { Injectable } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';

import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class UsersActiveInactiveService {
  constructor(private _localStorage: LocalStorageService) {}

  protected get getIonStore(): SessStoreProps[] | null {
    const ionstrttl = 'ionstr';

    const users = this._localStorage.getItem(ionstrttl);
    console.log(users);
    return JSON.parse(users);
  }

  get getUsersActive(): SessStoreProps {
    const users: SessStoreProps[] | null = this.getIonStore;
    console.log(users);

    // returns an object
    return users === undefined || users === null || users.length < 1
      ? null
      : users.find((cur) => {
          return cur.active === true;
        });
  }

  get getUsersInactive(): SessStoreProps[] {
    const users: SessStoreProps[] | null = this.getIonStore;
    // returns an array
    return users === undefined || users === null || users.length < 1
      ? []
      : users.filter((cur) => {
          return cur.active === false;
        });
  }
  get allUsers(): SessStoreProps[] {
    return this.getIonStore;
  }
}
