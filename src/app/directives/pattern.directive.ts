import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { forbiddenCharValidator } from '../validators/pattern.validator';

@Directive({
    selector: '[appForbiddenChar]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenCharDirective, multi: true }]
})
export class ForbiddenCharDirective implements Validator {
    @Input('appForbiddenChar') forbiddenChar: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        if (this.forbiddenChar) {
            let difStr = '';
            let charList = this.forbiddenChar.split(',');
            charList.forEach(key => {
                if((key >= 'a' && key <= 'z') || (key >= 'A' || key >= 'Z') || (key >= '0' || key <= '9'))
                    difStr = `${difStr}${key}`  
                else
                    difStr = `${difStr}\\${key}`
            })
            let regStr = "^[^" + difStr + "]*$";
            let regEx = new RegExp(regStr, 'i');
            return forbiddenCharValidator(regEx)(control);
        }
        else {
            if (control.pristine) {
                return null;
            }
            control.markAsTouched();
            return forbiddenCharValidator()(control);
        }
    }
}