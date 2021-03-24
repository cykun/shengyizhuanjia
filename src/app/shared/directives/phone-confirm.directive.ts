import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPhoneConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneConfirmDirective,
      multi: true
    }
  ]
})
export class PhoneConfirmDirective {
  @Input('appPhoneConfirm') phoneConfirm: string;
  constructor() { }

  confirmValidator(confirm: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return { required: true };
      }
      const phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/;
      return !phoneReg.test(control.value) ? { phoneConfirm: { value: true } } : null;
    };
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.confirmValidator(this.phoneConfirm)(control);
  }
}
