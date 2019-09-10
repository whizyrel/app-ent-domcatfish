import { Component, OnInit, Input } from '@angular/core';

import { DecEncService } from '../services/dec-enc.service';

import { ProductsProps } from '../interfaces/products-props';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})
export class ProductThumbnailComponent implements OnInit {
  @Input('list') public prodList: ProductsProps;

  public encURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  constructor(private _decEnc: DecEncService) { }

  ngOnInit() {
    this.encryptID(this.prodList.PID);
  }

  private encryptID(id: string) {
    this.encURL = this._decEnc.aesEncryption(id, this.seckey);
  }

}
