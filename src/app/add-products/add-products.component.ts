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

  private files;

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
    this.queryProgressBar.emit(true);
    const productDetails: ProductsProps = this.addProductForm.getRawValue();
    console.log({formDetails: productDetails, form: this.addProductForm});

    if (
      this.files === null
      || this.files === undefined
      || this.files.length < 1
    ) {
      this._dialog.showDialog({message: 'Please attach files'});
      return;
    } else {
      if (
        this.submitted === false
        && this.addProductForm.valid
      ) {
        this.submitted = true;
        // get form data
        const formData: FormData = this.formData(productDetails);
        formData.append('imgs', this.grabFiles(null));

        console.log({files: formData.has('imgs')});
        // post data
        this._productsService
        .addProduct(formData, this.getActiveUser.id)
        .subscribe(
          (data) => {
            this.queryProgressBar.emit(false);
            // show dialog
            this._dialog.showDialog({message: 'Added successfully!'});
            console.log({data});
          },
          (error) => {
            this.queryProgressBar.emit(false);
            this._dialog.showDialog({message: 'Something went wrong!'});
            console.log({error});
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
      console.log({key, value: form[key]});
    }

    return addProductFormData;
  }

  public grabFiles(e) {
    if (e !== null) {
      let isFile = false;
      if (e.target.files.length > 0) {
        this.files = e.target.files.map((cur, i) => cur.item(i));
        console.log({e, files: this.files});
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
