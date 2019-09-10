import { Component, OnInit, Input } from '@angular/core';

import { ProductsProps } from '../interfaces/products-props';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})
export class ProductThumbnailComponent implements OnInit {
  @Input('list') public prodList: ProductsProps;

  constructor() { }

  ngOnInit() {
  }

}
