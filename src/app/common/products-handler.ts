import { ProductsProps } from '../interfaces/products-props';

export class ProductsHandler {
  constructor() {}
  splitProducts(docs: ProductsProps[], size: number, cb) {
    const splittedProd = [];
    let buffer = [];
    let err;

    // console.log(`[bufferer] at begining`, {buffer, docs});

    // wrapper around docs
    if (docs !== null && docs !== undefined) {
      docs.forEach((cur, i) => {
         buffer.push(cur);

         // average case
         if ((++i % size) === 0) {
           splittedProd.push(buffer);
           buffer = [];
         }

         // worst case: i + 1 % size !== 0,
         // i === docs length || i + 1 > docs.length
        // console.log({1: (i % size) !== 0 , 2: i  === (docs.length)});
         if (
              (i % size) !== 0
              && i  === (docs.length)
            ) {
           // console.log('less than size');
           // console.log({1: (i % size) !== 0 , 2: i  === (docs.length)});
           splittedProd.push(buffer);
         }

         // console.log({buffer, size: size, i});
      });
      err = null;
      console.log({splittedProd, err});
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
