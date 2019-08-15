import { Injectable } from '@angular/core';

import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecEncService {

  constructor() { }

  aesEncryption(stf, sk) {
    return AES.encrypt(stf, sk);
  }
}
