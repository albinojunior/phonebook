import { validEmail, validName } from './regex.validator';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormBuilderValidators {

    constructor() { }

    public emailFormat(control: FormControl): { [key: string]: boolean } {
        return validEmail(control.value) ? null : { 'emailFormat': true };
    }

    public nameFormat(control: FormControl): { [key: string]: boolean } {
        return validName(control.value) ? null : { 'nameFormat': true };
    }
}
