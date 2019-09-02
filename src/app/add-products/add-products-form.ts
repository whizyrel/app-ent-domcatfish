import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

export class AddProductsForm {
  public get getForm() {
    return {
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      pack: new FormControl('', [
        Validators.required,
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(-1)
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      imgs: new FormControl('', [
        Validators.required,
      ]),
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
}
