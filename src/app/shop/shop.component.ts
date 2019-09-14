import { Component, OnInit, OnChanges } from '@angular/core';

import { ProductsHandler } from '../common/products-handler';

import { LinksService } from '../services/links.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductsService } from '../services/products.service';
import { DecEncService } from '../services/dec-enc.service';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';
import { PubUserDetails } from '../interfaces/pub-user-details';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    './css/style.min.css',
    './css/mdb.min.css',
    './shop.component.css',
  ],
})
export class ShopComponent implements OnInit {
  public title = `Debim`.toUpperCase();
  public links: LinkProps[];
  public types: string[];

  public encURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  // MatPaginator Output
  public pageIndex: number = 0;
  public pageSize: number = 3;

  public prodList: ProductsProps[][];
  public currProdList: ProductsProps[];

  constructor(
    private _linksService: LinksService,
    private _productsService: ProductsService,
    private productsHandler: ProductsHandler,
    private _decEnc: DecEncService
  ) {}

  ngOnInit() {
    this.links = this._linksService.getHomeNavbarLinks();
    this.types = this._linksService.getTypes();

    this.encURL = this._decEnc.aesEncryption('/shop', this.seckey);
    this.getProducts(null);
  }

  setPageSize(e) {
    this.pageSize = parseInt(e.target.value) || this.pageSize;
    setTimeout(() => this.getProducts(null), 1500);
  }

  switchCategory(type) {
    console.log({type});
    this.getProducts(type);
  }

  private getProducts(status) {
    this._productsService
    .getProductList
    .subscribe(
      (data: HttpResponse) => {
        this.productsHandler.splitProducts(
          status === null || status === 'All'
            ? data.docs
            : (
                data.docs.map(cur => {
                  if (cur.pack === status) {return cur;}
                })
              ).filter(cur => cur !== undefined),
          this.pageSize,
          (err, resp) => {
            if (err) {
              console.error({err});
              return;
            }
            this.prodList = resp;
            this.currProdList = resp[resp.length - resp.length];
          }
        );
      },
      (error: HttpResponse) => {
        console.error({error});
        this.prodList = undefined;
      }
    );

    window.onpageshow = () => {
      if (
        this.currProdList !== undefined && this.prodList !== undefined
        && this.currProdList !== null && this.prodList !== null
      ) {
        this.togglePaginators('left');
      }
    };
  }

  private get pageButtons() {
    return {
      left: document.querySelector('#l-pg'),
      right: document.querySelector('#r-pg')
    }
  }

  public pageHandler(i: number) {
    const right = this.pageButtons.right;
    const left = this.pageButtons.left;
    console.log({i});
    // use length instead

    if (i >= 0 && this.pageIndex < this.prodList.length) {
      this.currProdList = this.prodList[++this.pageIndex];
      if (left.classList.contains('d-none')) this.togglePaginators('left');
    }

    if (i < 0 && this.pageIndex > 0) {
      this.currProdList = this.prodList[--this.pageIndex];
      if (right.classList.contains('d-none')) this.togglePaginators('right');
    }
    // toggle
    if (this.pageIndex === this.prodList.length - 1) this.togglePaginators('right');
    if (this.pageIndex === 0) this.togglePaginators('left');
  }

  private togglePaginators(side: string) {
    const right = this.pageButtons.right;
    const left = this.pageButtons.left;
    if (side === 'left') {
      left.classList.toggle('d-none');
    }
    if (side === 'right') {
      right.classList.toggle('d-none');
    }
  }
}
