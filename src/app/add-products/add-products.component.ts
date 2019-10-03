import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  Validators,
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

  private files;
  private urlArr: any[] = [];

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
    console.log({formDetails: productDetails});

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
        console.log({f: this.grabFiles(null)});
        formData.append('imgs', this.grabFiles(null));
        // productDetails.imgs = this.urlArr;

        // post data
        this._productsService
        .addProduct(productDetails, this.getActiveUser.id)
        .subscribe(
          (data) => {
            this.queryProgressBar.emit(false);
            // show dialog
            this._dialog.showDialog({
              message: 'Added successfully!',
              action: () => console.log('[admin] upload dialog closed'),
            });
            console.log({data});
            this.showSpinner = false;
          },
          (error) => {
            this.queryProgressBar.emit(false);
            this._dialog.showDialog({
              message: 'Something went wrong!',
              action: () => console.log('[admin] upload dialog closed'),
            });
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

  public grabFiles(e) {
    if (e !== null) {
      let filesArr = Array.from(e.target.files);
      console.log({filesArr});
      if (filesArr.length > 0) {
        this.files = filesArr;
        /* filesArr.forEach(async (cur) => {
          await this.urlArr.push(URL.createObjectURL(cur));
        }); */
        return;
      }
      return;
    }
    return this.files;
  }

  getErrorMessage(): object {
    return {
      titleError: () => {
        if (this.status.title.hasError) {
          return this.status.title.hasError('required')
            ? 'You must enter a value'
            : (this.status.title.hasError('minlength')
              ? 'should be at least 5 characters long' : '');
        }
      },
      packError: () => {
        if (this.status.pack.hasError) {
          return this.status.pack.hasError('required')
            ? 'You select an option'
            : '';
        }
      },
      weightError: () => {
        if (this.status.weight.hasError) {
          return this.status.weight.hasError('required')
            ? 'You must enter a value'
            : (this.status.weight.hasError('min')
              ? 'minimum weight is 1' : '');
        }
      },
      quantityError: () => {
        if (this.status.title.hasError) {
          return this.status.quantity.hasError('required')
            ? 'You must enter a value'
            : (this.status.quantity.hasError('min')
              ? 'minimum quantity is 1' : '');
        }
      },
      priceError: () => {
        if (this.status.price.hasError) {
          return this.status.price.hasError('required')
            ? 'You must enter a value'
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
      // imgsError: () => {
      //   if (this.status.imgs.hasError) {
      //     return this.status.imgs.hasError('required')
      //       ? 'please select the image'
      //       : '';
      //   }
      // },
    };
  }

  public get status() {
    return this.addProductForm.controls;
  }
}
