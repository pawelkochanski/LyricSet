import {AbstractControl, ValidatorFn} from '@angular/forms';

export function specialSignValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const forbidden = reg.test(control.value);
    return !forbidden ? {specialsign: {value: control.value}} : null;
  };
}
