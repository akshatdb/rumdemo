import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenCharValidator(charRe: RegExp = null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let forbidden;
        if(!control.value || control.value.length === 0)
            return null;
        if (charRe)
            forbidden = charRe.test(control.value);
        else {
            let charRe = /^([^\<\>])*$/;
            forbidden = charRe.test(control.value);
        }
        return forbidden ? null:{ 'forbiddenChar': { value: control.value } };
    };
}