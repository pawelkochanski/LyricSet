import {AbstractControl, ValidatorFn} from '@angular/forms';

export function specialSignValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const reg = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$');
    const forbidden = reg.test(control.value);
    return !forbidden ? {specialsign: {value: control.value}} : null;
  };
}
