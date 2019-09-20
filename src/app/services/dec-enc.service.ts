import { Injectable } from '@angular/core';

import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecEncService {

  constructor() { }

  aesEncryption(stf: string, sk: string) {
    return AES.encrypt(stf, sk);
  }

  aesDecryption(stf: string, sk: string) {
    const bytes = AES.decrypt(stf, sk);

    return bytes.toString(enc.Utf8);
  }
}
