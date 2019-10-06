import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { ProductsService } from '../services/products.service';

import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public pList: ProductsProps[];
  public displayedColumns: string[] = ['title', 'pack', 'price', 'availability', 'quantity', 'img', 'opt'];
  public dataSource: MatTableDataSource<ProductsProps>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _productsService: ProductsService
  ) { }

  async ngOnInit() {
    await this.getProductsList();
  }

  public takeID(el) {
    console.log({el});
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getProductsList() {
    this._productsService
    .getProductList
    .subscribe((data: HttpResponse) => {
      this.pList = data.docs;
      console.log({d: data.docs});
      this.dataSource = new MatTableDataSource(this.pList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error: HttpResponse) => {
      console.log({error});
    });
  }

}
