import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DecEncService } from '../services/dec-enc.service';
import { ProductsService } from '../services/products.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { DialogService } from '../services/dialog.service';

import { HttpResponse } from '../interfaces/http-response';
import { PackTypesProps } from '../interfaces/pack-types-props';
import { ProductsProps } from '../interfaces/products-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

import { AddProductsForm } from '../add-products/add-products-form';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit,
AfterContentInit,
AfterContentChecked {
  public editProductForm: FormGroup;
  private pid: string;

  public product: ProductsProps;
  public step = 0;

  private activeUser: SessStoreProps;
  public packTypes: PackTypesProps[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _decEnc: DecEncService,
    private _productsService: ProductsService,
    private productForm: AddProductsForm,
    private _users: UsersActiveInactiveService,
    private _dialog: DialogService
  ) { }

  ngOnInit() {
    this.packTypes = this.productForm.getPackTypes();
    this.getID();
    this.editProductForm = this.formBuilder.group(this.productForm.getForm);
  }

  ngAfterContentInit() {
    setInterval(() => {}, 10000);
  }

  ngAfterContentChecked() {
    this.initActive();
  }

  onSubmit() {
    console.log({
      rv: this.editProductForm.getRawValue(),
      bool: this.editProductForm.dirty,
      cv: this.changedVal
    });

    if (!this.editProductForm.dirty) {
      this._dialog.showDialog({
        action: () => console.log('[dialog] closed Successfully!'),
        error: {message: 'no changes were made'},
      })
      return;
    }

    this._productsService
    .modifyProductDetails(
      this.pid,
      this.changedVal,
      this.activeUser.id
    )
    .subscribe(
      (data: HttpResponse) => {
        console.log({data});
        this._dialog.showDialog({
          action: () => console.log('[dialog] closed Successfully!'),
          message: {message: data.message},
        });

        this.getProductDetails();
      },
      (error: HttpResponse) => {
        console.log({error});
        this._dialog.showDialog({
          action: () => console.log('[dialog] closed Successfully!'),
          error: {message: error.error.message},
        });
      }
    );
  }

  get changedVal() {
    const d = [];
    this.iterateObj(
      this.product,
      (prop, obj) => {
        if (this.status[prop].dirty) {
          d.push({key: prop, val: this.status[prop].value});
        }
      }
    );
    return d;
  }

  private iterateObj(obj: ProductsProps, cb) {
    for (let prop in obj) {
      if (
        prop !== 'PID' &&
        prop !== '_id' &&
        prop !== 'imgs'
      ) {
          cb(prop, obj);
        }
    }
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
    return this.editProductForm.controls;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
