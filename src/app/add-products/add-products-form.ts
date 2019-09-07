import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { PackTypesProps } from '../interfaces/pack-types-props';

export class AddProductsForm {
  public get getForm() {
    return {
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      pack: new FormControl('', [
        Validators.required,
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15)
      ]),
      // imgs: new FormControl('', [
      //   Validators.required,
      // ]),
      availability: new FormControl('', [
        // Validators.required,
      ]),
      shippingInfo: new FormControl('', [
        // Validators.required,
      ]),
      shippingFee: new FormControl('', [
        // Validators.required,
      ])
    }
  }

  public getPackTypes(): PackTypesProps[] {
    return [{
      name: 'mini',
      value: 'mini',
    }, {
      name: 'midi',
      value: 'midi',
    }, {
      name: 'maxi',
      value: 'maxi',
    }, {
      name: 'mega',
      value: 'mega',
    }, {
      name: 'premium',
      value: 'premium',
    }];
  }
}
