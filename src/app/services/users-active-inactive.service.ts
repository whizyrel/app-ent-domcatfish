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

    const users = JSON.parse(this._localStorage.getItem(ionstrttl));
    console.log(users);
    return users;
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

  setNextActive() {
    const allUsers: SessStoreProps[] = this.allUsers;

    // if inactive users, set next inactive user to active
    this.getUsersInactive !== null && this.getUsersInactive !== undefined
      ? (() => {
          // get all inactives,
          const inactive: SessStoreProps[] = this.getUsersInactive;
          console.log(`[setNextActive]`);
          console.log(inactive);

          // change nextActive in all inactive user to active
          // change first element in inactive users only
          inactive.forEach((cur, i) => {
            if (i === 0) {
              cur.active = true;
            }
          });

          // save into local storage
          this._localStorage.setItem('ionstr', inactive);
        })()
      : null; // proceed to log only user out
  }
}
