import { Injectable } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { CartStoreProps } from '../interfaces/cart-store-props';
import { CartProps } from '../interfaces/cart-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private crtstrttl: string = 'crtstr';
  private tmpcrtttl: string = 'crt-tmp';
  private activeUser: SessStoreProps;

  constructor(
    private _localStorage: LocalStorageService,
    private _users: UsersActiveInactiveService
  ) {}

  private getParsedCart(ttl: string) {
    return JSON.parse(this._localStorage.getItem(ttl));
  }

  get getTempCartItems(): CartProps[] {
    const crt: CartProps[] = this.getParsedCart(this.tmpcrtttl);

    return (
      crt === null ||
      crt === undefined ?
        [] :
          crt
    );
  }

  addToTempCart(info: CartProps) {
    let cartArr: CartProps[] = [];

    const tmpCart: CartProps[] = this.getParsedCart(this.tmpcrtttl);

    tmpCart !== null && tmpCart !== undefined ?
      (() => {
        // push into tmpCart and set
        tmpCart.push(info);
        this._localStorage.setItem(this.tmpcrtttl, tmpCart);
      })() :
      (() => {
        cartArr.push(info);
        this._localStorage.setItem(this.tmpcrtttl, cartArr);
      })();

      // if user is logged in add to perm cart
      this.activeUser = this._users.getUsersActive;
      if (
        this.activeUser !== undefined &&
        this.activeUser !== null
      ) {
        // add to perm cart
        const {dt: {email}} = this.activeUser;
        this.addToCart(email, {em: email, crt: tmpCart});
        const permCart: CartProps[] = this.getCartItems(email);
        console.log({email, permCart});
      }
    console.log({tmpCart, cartArr, info});
  }

  deleteFromTempCart(i: number) {
    const tmpCart = this.getParsedCart(this.tmpcrtttl);

    if (tmpCart !== null && tmpCart !== undefined) {
      // remove one from ith position - array is left with rest of elements
      // and the removed is returned
      tmpCart.splice(i, 1);
    }

    // if user is logged in add to perm cart
    this.activeUser = this._users.getUsersActive;
    if (
      this.activeUser !== undefined &&
      this.activeUser !== null
    ) {
      // add to perm cart
      const {dt: {email}} = this.activeUser;
      this.addToCart(email, {em: email, crt: tmpCart});
    }
    // set others into localStorage
    this._localStorage.setItem(this.tmpcrtttl, tmpCart);
  }

  clearTempCart() {
    this._localStorage.removeItem(this.tmpcrtttl);
  }

  getCartItems(em: string): CartProps[] {
    let cartArray: CartProps[] = [];
    // cartStore an array of users cartStore
    // {em, crt}
    const cartStore: CartStoreProps[] = JSON.parse(
      this._localStorage.getItem(this.crtstrttl)
    );

    cartStore !== null && cartStore !== undefined && cartStore.length >= 1
      ? ((email: string) => {
          const cart: CartStoreProps = cartStore.find((cur) => {
            return cur.em === email;
          });

          const { em, crt: cartItems } = cart;

          cartItems !== null && cartItems !== undefined && cartItems.length >= 1
            ? (cartArray = cartItems)
            : cartArray;
        })(em)
      : cartArray;
    return cartArray;
  }

  addToCart(em: string, obj: CartStoreProps) {
    let index: number;

    const cartStore: CartStoreProps = JSON.parse(
      this._localStorage.getItem(this.crtstrttl)
    );

    // as long as user is logged in cartStore is always filled
    cartStore !== null && cartStore !== undefined && cartStore['length'] > 0
      ? (() => {
          // find index of em's object in cartStore
          // used [''] to avoid typescript's type asertion: findIndex doesn't exist in interface
          index = cartStore['findIndex']((cur) => {
            return cur.em === em;
          });

          // if index is less than zero: em doesnt exist in cart store or theres is no cart at all
          index !== null && index !== undefined && index >= 0
            ? (() => {
                // access user's item in cart store
                const { em, crt: cartItems } = cartStore[index];

                // push obj into cartItems
                cartItems.push(obj);

                // push new cartItems into cartStore[index]
                cartStore[index]['crt'] = cartItems;

                // stringify and save cartStore
                this._localStorage.setItem(this.crtstrttl, cartItems);
              })()
            : (() => {
                const arr: object[] = [];
                const cartObj: object = {};

                arr.push(obj);
                const cart: object[] = arr;

                cartObj[em] = arr;
                const cartItems: object = cartObj;

                this._localStorage.setItem(this.crtstrttl, cartItems);
              })();
        })()
      : null;
    // take care of null case
  }

  deleteFromCart(em: string, obj: object) {
    // gabbage code - reimplement
    // get all
    // get user's cart index
    // get user's cart
    let uci: number;

    const cartStore: CartStoreProps[] = JSON.parse(
      this._localStorage.getItem(this.crtstrttl)
    );

    // get user's cart
    const userCart = cartStore.find((cur, i) => {
      if (cur.em === em) uci = i;
      return cur.em === em;
    });

    const { crt } = userCart;

    // replace crt with others different from specified
    cartStore[uci]['crt'] = crt.filter((cur) => {
      return cur === obj;
    });
  }

  clearCart(em: string) {
    // get cart store
    const cartStore: CartStoreProps[] = JSON.parse(
      this._localStorage.getItem(this.crtstrttl)
    );

    // filter carts different from user. cart store can never be undefined || null
    const othercarts: CartStoreProps[] = cartStore.filter((cur) => {
      return cur.em !== em;
    });

    console.log(othercarts);

    // worstcase remove all of crtstr
    othercarts !== null && othercarts !== undefined
      ? this._localStorage.setItem(this.crtstrttl, othercarts)
      : this._localStorage.removeItem(this.crtstrttl);
  }
}
