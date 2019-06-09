import { Injectable } from '@angular/core';
import { InitsnackbarService } from '../services/initsnackbar.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  public request;

  constructor(
    private _initSnackbar: InitsnackbarService
  ) { }
  alert() {
    const alertMsg = 'Your browser doesn\'t support a stable version of IndexedDB.' +
    ' Persistence will not be available. Kindly update or change your browsers';
    const duration = 7000;
    if (!window.indexedDB) {
      // window.alert(alertMsg);
      this._initSnackbar.showSnackBarFromMsg(alertMsg, duration);
    }
    return this;
  }

  openDB(
    DBtitle: string,
    objectStoreTitle:  string | string[],
    keyPath: string | string[], vrs: number
  ) {
    console.log(`[IndexedDB] opening DB...!`);

    this.request = window.indexedDB.open(DBtitle, vrs);
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      db.onerror = () => {
        console.log(`[IndexedDB] DB open failed. [Error] at db.error`);
      };
      // create new object store
      // this.objectStore = db.createObjectStore(this.objStrTitle, {keyPath: this.keyPath});
      console.log(`[IndexedDB] DB setup successful!`);
    };
    this.request.onerror = (event) => {
      // Generic error handler for all errors targeted at this database's
      const db = event.target.result;
      // requests!
      console.log(`[IndexedDB] [Error]: db.error ${event.target.error}`);
    };
    // This event is only implemented in recent browsers
    // on onupgradeneeded is always called when opening a DB
    this.request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      const db = event.target.result;

      db.onerror = () => {
        console.log(`[IndexedDB] DB open failed. [Error] at db.error`);
      };
      // Create an objectStore for this database - i dont need previous object store except new ones
      Array.isArray(objectStoreTitle) ?
      ((objstrs) => {
        objstrs.forEach((cur, i) => {
          console.log(`[IndexedDB] creating Object Store ${cur}`);
          db.createObjectStore(cur,
            {
              keyPath: keyPath,
              autoIncrement: true
          }).createIndex(keyPath, keyPath); // { keyPath: 'usn' }
          console.log(`created ${cur} ${i}`);
        });
      })(objectStoreTitle) :
      ((objstr) => {
        console.log(`[IndexedDB] creating Object Store ${objectStoreTitle}`);
        db.createObjectStore(
          objstr,
          { keyPath: keyPath, autoIncrement: true }
        ).createIndex(keyPath);
        console.log(`created ${objstr}`);
      })(objectStoreTitle);
      console.log(`[IndexedDB] DB upgraded!`);
    };
    console.log(`[IndexedDB] Opened Database`);
    return this;
  }

  addToIDB(objStrTitle: string, data: object | object[] | string) {
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      db.onerror = (_event) => {
        console.log(`[IndexedDB] DB open failed. [Error]: db.error ${_event.target.error}`);
      };
      const objectStore = db.transaction(objStrTitle, 'readwrite').objectStore(objStrTitle);
      Array.isArray(data) ? ((dts) => {
        dts.forEach((dt, i) => {
          objectStore.add(dt);
          console.log(`added to ${dt} ${i}`);
        });
      })(data) : ((dt) => {
        objectStore.add(dt);
        console.log(`added to ${dt}`);
      })(data);

      if (typeof data === 'string') {
        objectStore.add(data);
      }
      console.log(`[IndexedDB] added to DB successfully!`);
    };
    return this;
  }
  deleteFromIDB(DBtitle: string, objStrTitle: string, keyPath: string) {
    this.request = window.indexedDB.open(DBtitle);
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction(objStrTitle).objectStore(objStrTitle);
      objectStore.delete(keyPath);
    };
  }

  updateFromIDB(DBtitle: string, objStrTitle: string, keyPath: string, data, dataPath: string) {
    this.request = window.indexedDB.open(DBtitle);
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction(objStrTitle).objectStore(objStrTitle);
      const req = objectStore.get(keyPath);
      req.onsuccess = (_event) => {
        const res = _event.target.result;
        res[dataPath] = data;
      };
    };
  }
  clearObjectStore (DBtitle: string, objStrTitle: string) {
    this.request = window.indexedDB.open(DBtitle);
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction(objStrTitle).objectStore(objStrTitle);
      objectStore.clear();
    };
  }
  getAllFromIDB(DBtitle: string, objStrTitle: string, keyPath: string) {
    let content;
    this.request = window.indexedDB.open(DBtitle);
    this.request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction(objStrTitle).objectStore(objStrTitle);
      content = objectStore.getAll();
    };
    return content;
  }
}
