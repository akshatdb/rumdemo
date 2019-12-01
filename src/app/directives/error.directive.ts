import { Directive, Input, ElementRef, Renderer2 } from "@angular/core";
import { NG_VALIDATORS, NgControl } from "@angular/forms";

@Directive({
    selector: '[formControlName], [FormControl]'
})
export class FormErrorDirective {
    constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2){}

    ngOnInit(){
        if(this.el.nativeElement.closest('mat-form-field')){
            let parent = this.el.nativeElement.closest('mat-form-field').children[0];
            let errorMsg = document.createElement('small');
            errorMsg.className = 'form-error';
            errorMsg.hidden = true;
            if(this.renderer)
                this.renderer.appendChild(parent, errorMsg);
            this.control.statusChanges.subscribe(res => {
                if(res === 'INVALID'){
                    if(this.control.errors['forbiddenChar'])
                    {
                        errorMsg.innerText = 'Invalid input';
                        errorMsg.hidden = false;
                    }
                    else if(this.control.errors['required']){
                        errorMsg.innerText = 'This field is required';
                        errorMsg.hidden = false;
                    }
                    else{
                        errorMsg.innerText = '';
                        errorMsg.hidden = true;
                    }
                }
                else{
                    errorMsg.hidden = true;
                }
            });
        }
    }
}