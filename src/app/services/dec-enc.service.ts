import { Injectable } from '@angular/core';

import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecEncService {
  private seckey: string = 'app-ent-domcatfish';
  constructor() { }

  aesEncryption(stf: string, sk: string  = this.seckey) {
    return AES.encrypt(stf, sk);
  }

  aesDecryption(stf: string, sk: string = this.seckey) {
    const bytes = AES.decrypt(stf, sk);

    return bytes.toString(enc.Utf8);
  }
}
