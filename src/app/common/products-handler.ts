import { ProductsProps } from '../interfaces/products-props';

export class ProductsHandler {
  constructor() {}
  splitProducts(docs: ProductsProps[], size: number, cb) {
    const splittedProd = [];
    let buffer = [];
    let err;

    // wrapper around docs
    if (docs !== null && docs !== undefined) {
      docs.forEach((cur, i) => {
         buffer.push(cur);

         // average case
         if ((++i % size) === 0) {
           splittedProd.push(buffer);
           buffer = [];
         }

         if (
              (i % size) !== 0
              && i  === (docs.length)
            ) {
           splittedProd.push(buffer);
         }
      });
      err = null;
      cb(err, splittedProd);
      return;
    }

    err = splittedProd.length !== 0
      ? null
      : new Error('Something is wrong. list is either empty or typescript/angular is gone mad again');
      console.log({splittedProd, err});
    cb(err, splittedProd);
  }
}
