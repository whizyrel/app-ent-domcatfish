import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

export class SignupForm {
  private formBuilder: FormBuilder = new FormBuilder();
  constructor() {}

  getFormBuilder(who: string) {
    return this.formBuilder.group(
      {
        firstname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        gender: new FormControl('', [
          Validators.required,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line:max-line-length
            /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
          ),
        ]),
        countrycode: new FormControl('', Validators.required),
        accountType: new FormControl(who),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        address: new FormControl('', [
          Validators.required,
        ]),
        state: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
          ),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
          ),
        ]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirm').value
      ? null
      : { mismatch: true };
  }
}
