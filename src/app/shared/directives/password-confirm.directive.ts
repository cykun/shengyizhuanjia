import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordConfirmDirective,
      multi: true
    }
  ]
})
export class PasswordConfirmDirective {
  @Input('appPasswordConfirm') passwordConfirm: string;
  constructor() { }

  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return { required: true };
      }
      const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      return !passwordReg.test(control.value) ? { confirm: { value: true } } : null;
    };
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.confirmValidator()(control);
  }

}
