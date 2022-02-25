import { FormGroup } from "@angular/forms";

export function CeroValidator(controlName: string) {
    console.log(controlName)
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[controlName];
        if (
            control.errors &&
            !control.errors.mayorCero
        ) {
            return;
        }
        console.log(control.value)
        if (parseInt(control.value)<= 0) {
            
            control.setErrors({ mayorCero: true });
        } else {
            control.setErrors(null);
        }
    };
    
}