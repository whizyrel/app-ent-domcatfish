import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { ProductsProps } from '../interfaces/products-props';
import { HttpResponse } from '../interfaces/http-response';
import { PackTypesProps } from '../interfaces/pack-types';

import { AddProductsForm } from './add-products-form';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  public addProductForm: FormGroup;
  private productDetails: ProductsProps;

  public processing: boolean = false; // default is false
  public packTypes: PackTypesProps[];

  private submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productForm: AddProductsForm
  ) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group(this.productForm.getForm);
    this.packTypes = this.productForm.getPackTypes();
  }

  onSubmit() {
    this.processing = true;
    const productDetails = this.addProductForm.getRawValue();
    console.log({formDetails: productDetails});

    if (this.submitted === false) {
      //

      this.submitted = true;
      return;
    }
  }

  public grabFiles(el) {
    console.log({el});
  }

  disableBtn(): Boolean {
    if (
      this.status.title.value === '' ||
      this.status.pack.value === '' ||
      this.status.weight.value === '' ||
      this.status.price.invalid ||
      this.status.quantity.value === '' ||
      this.status.shippingInfo.value === '' ||
      this.status.description.value === ''
    ) {
      return true;
    }
}

  getErrorMessage(): object {
    return {
      titleError: () => {
        if (this.status.title.hasError) {
          return this.status.title.hasError('required')
            ? 'You must enter a value'
            : (this.status.title.hasError('minlength')
              ? 'should be at least 3 characters long' : '');
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
            : this.status.description.hasError('minlength') ? 'minimum length is 10 characters...' : '';
        }
      },
      imgsError: () => {
        if (this.status.imgs.hasError) {
          return this.status.imgs.hasError('required')
            ? 'please select the image'
            : '';
        }
      },
    };
  }

  public get status() {
    return this.addProductForm.controls;
  }
}
