import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DecEncService } from '../services/dec-enc.service';
import { ProductsService } from '../services/products.service';

import { HttpResponse } from '../interfaces/http-response';
import { ProductsProps } from '../interfaces/products-props';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit, AfterContentInit {
  private pid: string;

  public product: ProductsProps;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _decEnc: DecEncService,
    private _productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getID();
  }

  ngAfterContentInit() {
    this.getProductDetails();
  }

  showField(d, f) {
    d.classList.toggle('d-none');
    if (d.classList.contains('d-flex')) {
      d.classList.remove('d-flex');
    } else {
      d.classList.add('d-flex');
    }
    f.classList.toggle('d-none');
  }

  private getProductDetails() {
    this._productsService
    .getProductDetails(this.pid)
    .subscribe((data: HttpResponse) => {
      this.product = data.doc;
    }, (error: HttpResponse) => {
      console.log({error});
    });
  }

  private getID() {
    this.activatedRoute
    .queryParams
    .subscribe((param) => {
      this.pid = this._decEnc.aesDecryption(param.p);
    });
  }
}
