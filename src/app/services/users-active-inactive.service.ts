import { Injectable } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';

import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class UsersActiveInactiveService {
  constructor(
    private _localStorage: LocalStorageService
  ) {}

  protected get getIonStore(): SessStoreProps[] | null {
    const ionstrttl = 'ionstr';

    return JSON.parse(this._localStorage.getItem(ionstrttl));
  }

  get getUsersActive(): SessStoreProps {
    const users: SessStoreProps[] | null = this.getIonStore;

    // returns an object
    return users === undefined || users === null || users.length < 1
      ? null
      : users.find((cur, i) => {
          cur.index = i;
          return cur.active === true;
        });
  }

  get getUsersInactive(): SessStoreProps[] {
    const users: SessStoreProps[] | null = this.getIonStore;
    // returns an array
    return users === undefined || users === null || users.length < 1
      ? []
      : users.filter((cur, i) => {
          cur.index = i;
          return cur.active === false;
        });
  }

  get allUsers(): SessStoreProps[] {
    return this.getIonStore;
  }

  setNextActive() {
    // if inactive users, set next inactive user to active
    this.getUsersInactive !== null && this.getUsersInactive !== undefined
      ? (() => {
          // get all inactives
          const inactive: SessStoreProps[] = this.getUsersInactive;
          console.log(`[setNextActive]`);

          // change nextActive in all inactive user to active
          // change first element in inactive users only
          inactive.forEach((cur, i, arr) => {
            // if inactive[0].dt.accountType === 'client'
            // find admin in inactive and make next active else
            // inactive[0] || i is next Active
            // if (arr[arr.length - arr.length].dt.accountType === 'client') {
            //   const adminUser = arr.find((cur) => cur.dt.accountType === 'admin');
            //   adminUser !== null && admin !== undefined
            //   ? adminUser.active === true : null; // route to admin login
            // } else {
              if (i === 0) { // chose first user as next Active
                cur.active = true;
              }
            // }
          });

          // save into local storage
          this._localStorage.setItem('ionstr', inactive);
        })()
      : null; // proceed to log only user out
  }

  switchUser(index: number) {
    // grab index, all users
    const users = this.allUsers;
    const {index: i} = this.getUsersActive;

    // users can never be null, undefined || length of 0
    // set other active to false
    if (users !== null && users !== undefined && users.length > 0) {
      users[i].active = false;
      users[index].active = true;
      // save into ions store;
      this._localStorage.setItem('ionstr', users);
    }
    // set this index to true;
  }

  // wrong imp, cur.dt.accountType === 'admin'
  public isAdmin(i: number) {
    const users = this.allUsers;
    return users[i].active === true ? true : false;
  }
}
