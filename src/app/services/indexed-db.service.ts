import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { }
  alert() {
    if (!window.indexedDB) {
      window.alert(
        'Your browser doesn\'t support a stable version of IndexedDB.' +
        ' Such and such feature will not be available.');
    }
  }
}
