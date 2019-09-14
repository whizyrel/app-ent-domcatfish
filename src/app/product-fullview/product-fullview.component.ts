import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DecEncService } from '../services/dec-enc.service';
import { ProductsService } from '../services/products.service';

import { ProductsProps } from '../interfaces/products-props';
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
  private pid: string;
  private seckey: string = 'app-ent-domcatfish';
  public info: ProductsProps;
  private total: number = 0;
  public availability: string;

  public encURL: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _decEnc: DecEncService,
    private _productsService: ProductsService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const { st } = param;
      console.log({st});

      this.pid = this._decEnc.aesDecryption(st.toString(), this.seckey);
      console.log({pid: this.pid});
      this.getProductDetails(this.pid);
      this.encURL = this._decEnc.aesEncryption(`/shop/view?st=${this.pid}`, this.seckey);
    });
  }

  getProductDetails(id: string) {
    this._productsService
    .getProductDetails(this.pid)
    .subscribe(
      (data: HttpResponse) => {
        console.log({doc: data.doc});
        this.info = data.doc;
        this.availability =
        this.info.availability ? ' Available' : ' Not available'
      },
      (error: HttpResponse) => {
        console.error({error});
        // show modal
      }
    )
  }
}
