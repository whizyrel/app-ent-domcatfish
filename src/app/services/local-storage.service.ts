import { Injectable } from '@angular/core';

import { AES, enc } from 'crypto-js';

import { CartStoreProps } from '../interfaces/cart-store-props';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private seckey: string = 'app-ent-domcatfish';

  constructor() {}

  getItem(ttl: string) {
    // get item
    // Jwt decode now crpto-js
    // JSON.parse
    // return
    let decrypted;
    const encryption: string = this.getRaw(ttl);

    // case []
    encryption === '[]'
      ? (decrypted = '[]')
      : (() => {
          if (encryption === null || encryption === undefined) {
            decrypted = 'null';
          } else {
            const bytes = AES.decrypt(encryption.toString(), this.seckey);
            // console.log(`bytes: ${bytes}`);
            decrypted = bytes.toString(enc.Utf8);
          }
        })();

    // cannot use JSON.parse as everything cannot be JSON
    return decrypted;
  }

  setItem(ttl: string, obj: object) {
    const encrypted: string = AES.encrypt(JSON.stringify(obj), this.seckey);
    // console.log(`setItem: ${encrypted}`);
    localStorage.setItem(ttl, encrypted);
  }

  removeItem(ttl: string) {
    localStorage.removeItem(ttl);
  }

  protected getRaw(ttl: string): string {
    return localStorage.getItem(ttl);
  }
}
