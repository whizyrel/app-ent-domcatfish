import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private title: string;
  private objStrTitle: string;
  private keyPath: string;
  private objectStore;
  private request;
  private db;
  private data;

  constructor() { }
  alert() {
    if (!window.indexedDB) {
      window.alert(
        'Your browser doesn\'t support a stable version of IndexedDB.' +
        ' Such and such feature will not be available.');
    }
    return this;
  }

  setIDBOBJStoreProp(obj: {title: string, keyPath: string, data: object}) {
    const {title, keyPath, data} = obj;
    this.objStrTitle = this.keyPath; // object store name must be keyPath since using keyPath
    this.keyPath = keyPath;
    this.data = data;
    return this;
  }

  openDB(title: string, vrs: number) {
    console.log(`[IndexedDB] opening...!`);
    this.title = title;
    this.request = window.indexedDB.open(this.title, vrs);
    // this.request.onsuccess = this.onsuccess;
    this.request.onerror = this.onerror;
    // This event is only implemented in recent browsers
    // on onupgradeneeded is always called when opening a DB
    this.request.onupgradeneeded = this.onupgradeneeded;
    return this;
  }

  addtoIDB(data: object | object[]) {
    const objectStore = this.db.transaction(this.objStrTitle, 'readwrite').objectStore(this.keyPath);
    Array.isArray(data) ? ((dts) => {
      dts.forEach((dt) => {
        objectStore.add(dt);
      });
    })(data) : ((dt) => {
      objectStore.add(dt);
    })(data);

    return this;
  }
  // ignore onsuccess
  private onsuccess(event) {
    const db = event.target.result;
    this.db = db;
    db.onerror = (_event) => {
      console.log(`[IndexedDB] error: ${_event.target.errorCode}`);
    };
    // create new object store
    this.objectStore = db.createObjectStore(this.objStrTitle, {keyPath: this.keyPath});
    console.log(`[IndexedDB] DB setup successful!`);
    return this;
  }
  private onerror(event) {
    const db = event.target.result;
    // Generic error handler for all errors targeted at this database's
    // requests!
    console.log(`[IndexedDB] error: ${event.target.errorCode}`);
  }
  private onupgradeneeded(event) {
    // Save the IDBDatabase interface
    const db = event.target.result;
    this.db = db;

    db.onerror = (_event) => {
      console.log(`[IndexedDB] error: ${_event.target.errorCode}`);
    };
    // Create an objectStore for this database - i dont need previous object store except new ones
    db
    .createObjectStore(this.objStrTitle, { keyPath: this.keyPath })
    .transaction.oncomplete = (_event) => {
      const _db = _event.target.result;
      this.db = _db;
      db.transaction(this.objStrTitle, 'readwrite').objectStore(this.objStrTitle)
      .add(this.data);
    };
    console.log(`[IndexedDB] DB upgraded!`);
    return this;
  }
}
