import { ProductsProps } from '../interfaces/products-props';

export class ProductsHandler {
  constructor() {}
  splitProducts(docs: ProductsProps[], size: number, cb) {
    const splittedProd = [];
    let buffer = [];

    console.log(`[bufferer] at begining`, {buffer});

    docs.forEach((cur, i) => {
       buffer.push(cur);

       // average case
       if ((++i % size) === 0) {
         console.log({i: i});
         splittedProd.push(buffer);
         buffer = [];
       }

       // worst case: i + 1 % size !== 0,
       // i === docs length || i + 1 > docs.length
      console.log({1: (i % size) !== 0 , 2: i  === (docs.length)})
       if (
            (i % size) !== 0
            && i  === (docs.length)
          ) {
         // console.log('less than size');
         console.log({1: (i % size) !== 0 , 2: i  === (docs.length)});
         splittedProd.push(buffer);
       }

       console.log({buffer, size: size, i});
    });

    console.log({splittedProd});
    const err = docs.length !== 0 && splittedProd.length !== 0
      ? null
      : new Error('Something is wrong. list is either empty or typescript/angular is gone mad again');

    cb(err, splittedProd);
  }
}
