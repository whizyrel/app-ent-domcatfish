import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DecEncService } from '../services/dec-enc.service';
import { ProductsService } from '../services/products.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';

import { ProductsProps } from '../interfaces/products-props';
import { CartProps } from '../interfaces/cart-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-product-fullview',
  templateUrl: './product-fullview.component.html',
  styleUrls: [
    './css/style.min.css',
    './css/mdb.min.css',
    './product-fullview.component.css',
  ]
})
export class ProductFullviewComponent implements OnInit {
  private seckey: string = 'app-ent-domcatfish';

  private pid: string;
  public imgs: string[];
  public info: ProductsProps;
  private total: number = 0;
  public availability: string;

  public encURL: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _decEnc: DecEncService,
    private _productsService: ProductsService,
    private _localStorage: LocalStorageService,
    private _cartService: CartService
  ) { }

  async ngOnInit() {
    await this.activatedRoute.queryParams.subscribe(async (param) => {
      const { st } = param;
      console.log({st});

      this.pid = this._decEnc.aesDecryption(st.toString(), this.seckey);
      console.log({pid: this.pid});
      await this.getProductDetails(this.pid);
      this.encURL = this._decEnc.aesEncryption(`/shop/view?st=${this.pid}`, this.seckey);
    });
  }

  async getProductDetails(id: string) {
    await this._productsService
    .getProductDetails(id)
    .subscribe(
      async (data: HttpResponse) => {
        this.info = await data.doc;
        this.imgs = data.doc.imgs;
        console.log({doc: this.info});
        this.availability =
        this.info.availability ? ' Available' : ' Not available';
      },
      (error: HttpResponse) => {
        console.error({error});
        // show modal
      }
    )
  }
  addToCart(qty: string) {
    const cartInfo: CartProps = {
      quantity: parseInt(qty),
      price: this.info.price,
      PID: this.pid,
      imgs: this.info.imgs,
    };

    this._cartService.addToTempCart(cartInfo);
  }
}
