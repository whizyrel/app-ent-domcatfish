import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { DecEncService } from '../services/dec-enc.service';

import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  @Input('val') searchVal;

  public pList: ProductsProps[];
  public displayedColumns: string[] = [
    'title', 'pack', 'price',
    'availability', 'quantity', 'img',
    'opt',
  ];
  public dataSource: MatTableDataSource<ProductsProps>;

  private pid: string;
  public showSpinner: boolean = true;
  private showLoading: boolean = false;

  private activeUser: SessStoreProps;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _users: UsersActiveInactiveService,
    private _decEnc: DecEncService
  ) { }

  ngOnInit() {
    this.getProductsList();
    this.activeUser = this.getActiveUser;
  }

  public navigate(path: string, pid) {
    this.router.navigate([path], {
      relativeTo: this.activatedRoute,
      queryParams: {p: this._decEnc.aesEncryption(pid)},
    });
  }

  public deleteProduct(pid: string) {
    this.showLoading = true;
    this._productsService
    .deleteProduct(pid, this.activeUser.id)
    .subscribe((data) => {
      this.getProductsList()
      this.showLoading = false;
    }, (error) => {
      console.log({error});
      this.showLoading = false;
    });
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
      this.dataSource = new MatTableDataSource(this.pList);

      window.onpageshow = (e) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      };
      window.onload = (e) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      };
      this.showSpinner = false;
    },
    (error: HttpResponse) => {
      console.log({error});
    });
  }

  get getActiveUser(): SessStoreProps {
    return this._users.getUsersActive;
  }
}
