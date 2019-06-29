import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private _localStorage: LocalStorageService) {}
  logout() {
    const ionstrttl = 'ionstr';

    const inactive = JSON.parse(this._localStorage.getItem(ionstrttl)).filter(
      (cur) => {
        return cur.active === false;
      }
    );

    this._localStorage.setItem(ionstrttl, inactive);
  }
}
