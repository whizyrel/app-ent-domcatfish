export interface IdbEventTarget extends EventTarget {
  result?: IDBDatabase;
  transaction?: IDBTransaction;
}
