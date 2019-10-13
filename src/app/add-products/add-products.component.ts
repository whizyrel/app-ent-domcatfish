import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { ProductsService } from '../services/products.service';

import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';
import { PackTypesProps } from '../interfaces/pack-types-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

import { AddProductsForm } from './add-products-form';
import { DialogService } from '../services/dialog.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  public addProductForm: FormGroup;
  private productDetails: ProductsProps;

  public packTypes: PackTypesProps[];

  private submitted: boolean = false;
  public showSpinner: boolean = false;

  private files: File[];

  @Output() public queryProgressBar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private productForm: AddProductsForm,
    private _dialog: DialogService,
    private _productsService: ProductsService,
    private _users: UsersActiveInactiveService
  ) { }

  ngOnInit() {
    this.queryProgressBar.emit(false);
    this.addProductForm = this.formBuilder.group(this.productForm.getForm);
    this.packTypes = this.productForm.getPackTypes();
  }

  onSubmit() {
    this.showSpinner = true;
    const productDetails: ProductsProps = this.addProductForm.getRawValue();

    if (
      this.files === null ||
      this.files === undefined ||
      this.files.length < 1
    ) {
      this._dialog.showDialog({
        message: 'Please attach files',
        action: () => this.showSpinner = false
      });
      return;
    } else {
      if (
        /* this.submitted === false
        && */ this.addProductForm.valid
      ) {
        this.submitted = true;
        // setTimeout(() => this.showSpinner = false, 15000);
        // get form data
        const formData: FormData = this.formData(productDetails);
        this.appendImgs(this.files, formData);

        // post data
        this._productsService
        .addProduct(formData, this.getActiveUser.id)
        .subscribe(
          (data: HttpResponse) => {
            this.queryProgressBar.emit(false);
            // show dialog
            this._dialog.showDialog({
              message: data.message,
              action: () => console.log('[admin] upload dialog closed'),
            });
            this.showSpinner = false;
          },
          (error) => {
            this.queryProgressBar.emit(false);
            this._dialog.showDialog({
              message: error.error.message,
              action: () => console.log('[admin] upload dialog closed'),
            });
            if (error.status === 401 && error.error.message === "Session Expired!") {
              window.location.reload(true);
            }
            console.log({error});
            this.showSpinner = false;
          });
      }
    }
  }

  private get getActiveUser(): SessStoreProps {
    return this._users.getUsersActive;
  }

  public formData(form): FormData {
    const addProductFormData = new FormData();

    for (let key in form) {
      addProductFormData.append(key, form[key]);
    }

    return addProductFormData;
  }

  private appendImgs(flArr, fd: FormData) {
    flArr.forEach((cur, i) => {
      fd.append(`imgs-${i}`, flArr[i]);
    });
  }

  public grabFiles(e) {
    this.files = [];
    const fl: FileList = e.target.files;
    let filesArr: File[] = Array.from(fl);
    if (fl.length > 0) {
      this.files = filesArr;
    }
  }

  getErrorMessage(): object {
    return {
      titleError: () => {
        if (this.status.title.hasError) {
          return this.status.title.hasError('required')
            ? 'a title is required'
            : (this.status.title.hasError('minlength')
              ? 'should be at least 5 characters long' : '');
        }
      },
      packError: () => {
        if (this.status.pack.hasError) {
          return this.status.pack.hasError('required')
            ? 'selecting an option is required'
            : '';
        }
      },
      weightError: () => {
        if (this.status.weight.hasError) {
          return this.status.weight.hasError('required')
            ? 'a weight value is required'
            : (this.status.weight.hasError('min')
              ? 'minimum weight is 1' : '');
        }
      },
      quantityError: () => {
        if (this.status.quantity.hasError) {
          return this.status.quantity.hasError('required')
            ? 'a quantity is required'
            : (this.status.quantity.hasError('min')
              ? 'minimum quantity is 1' : '');
        }
      },
      priceError: () => {
        if (this.status.price.hasError) {
          return this.status.price.hasError('required')
            ? 'a price is required'
            : (this.status.price.hasError('min')
              ? 'minimum price is 1' : '');
        }
      },
      descriptionError: () => {
        if (this.status.description.hasError) {
          return this.status.description.hasError('required')
            ? 'product description is required'
            : (this.status.description.hasError('minlength') ? 'minimum length is 10 characters...' : '');
        }
      },
    };
  }

  public get status() {
    return this.addProductForm.controls;
  }

  public openFileDialog(el) {
    el.click();
  }
}
