import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmDirective,
      multi: true
    }
  ]
})
export class ConfirmDirective {
  @Input('appConfirm') confirm: string;
  constructor() { }

  confirmValidator(confirm: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return { required: true };
      }
      return control.value !== confirm ? { confirm: { value: true } } : null;
    };
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.confirm ? this.confirmValidator(this.confirm)(control) : null;
  }
}
