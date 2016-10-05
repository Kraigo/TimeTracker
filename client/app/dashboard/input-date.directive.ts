import { Directive, OnInit } from "@angular/core";
import { NgControl } from '@angular/forms';

@Directive({
    selector: "[ngModel][inputDate]",
    host: {
        '(ngModelChange)': 'onInputChange($event)',
        '(blur)': 'onBlur($event)'
    }
})


export class InputDate implements OnInit {

    constructor(
        public control: NgControl
    ) { }

    ngOnInit() {
        console.log('Test');
        // debugger;
    }
    onInputChange(value: string | string) {
        if (!value || typeof value === 'number') return;
        let model = this.viewToModel(value);
        this.control.viewToModelUpdate(model)
    }

    onBlur() {
        let val:any = this.control.model;
        
        let model = this.viewToModel(val);
        var view = this.modelToView(model);

        this.control.valueAccessor.writeValue(view)
        this.control.viewToModelUpdate(model);
    }

    viewToModel(inputValue: string) : number {
        var newValue = 0;
        var hours = 0;
        var minutes = 0;

        var matchByColon = inputValue.split(':');
        var matchByDot = inputValue.split('.');
        var matchBySpace = inputValue.split(' ');

        if (matchByColon.length > 1) {
            hours = matchByColon[0];
            minutes = matchByColon[1] || 0;
        } else if (matchByDot.length > 1) {
            hours = matchByDot[0] || 0;
            minutes = matchByDot[1] || 0;
            minutes = parseInt(60 * parseFloat('0.' + minutes));
        } else if (matchBySpace.length > 1) {
            hours = matchBySpace[0] || 0;
            minutes = matchBySpace[1] || 0;
        } else {
            hours = parseInt(inputValue);
        }

        if (minutes.length === 1) {
            minutes = minutes + '0';
        }
        hours = hours > 60 ? 0 : hours;
        minutes = minutes > 60 ? 0 : minutes;

        newValue += parseInt(hours) * 60 * 60;
        newValue += parseInt(minutes) * 60;

        return newValue * 1000;
    }

    modelToView(inputValue: number) {
        var minutes = Math.floor(inputValue / 1000 / 60) % 60;
        var hours = Math.floor(inputValue / 1000 / (60 * 60)) % 60;

        minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
        hours = hours.toString().length === 1 ? '0' + hours : hours;

        var dateValue = hours + ':' + minutes;
        return dateValue;
    }

}
