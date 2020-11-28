import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function utcDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log('Control value: ', control.value);

    const isDate = Date.parse(control.value);
    console.log(`Date parsed`, isDate);

    return !isDate ? { invalidDate: { value: control.value } } : null;
  };
}
