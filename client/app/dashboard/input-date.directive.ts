import { Directive, OnInit, OnChanges, Input } from "@angular/core";
import { NgModel } from '@angular/forms';

@Directive({
    selector: "[ngModel][inputDate]",
    host: {
        '(ngModelChange)': 'onInputChange($event)',
        '(blur)': 'onBlur($event)'
    }
})

export class InputDate implements OnInit {

    constructor(
        public control: NgModel
    ) {
        this.control.valueChanges.subscribe(val => this.onInputChange(val))
    }

    ngOnInit() {
        this.setViewValue();
    }
    
    onInputChange(value: string) {
        if (typeof value === 'number') {
            let model = this.control.viewModel;
            var view = this.modelToView(model);
            this.control.valueAccessor.writeValue(view);
        }
    }

    onBlur() {
        let val:any = this.control.viewModel.toString();      
        let model = this.viewToModel(val);
        var view = this.modelToView(model);
        this.control.valueAccessor.writeValue(view)
        this.control.viewToModelUpdate(model);
    }

    viewToModel(inputValue: string) : number {
        let newValue:any = 0;
        let hours:any = 0;
        let minutes:any = 0;

        let matchByColon = inputValue.split(':');
        let matchByDot = inputValue.split('.');
        let matchBySpace = inputValue.split(' ');

        if (matchByColon.length > 1) {
            hours = matchByColon[0];
            minutes = matchByColon[1] || 0;
        } else if (matchByDot.length > 1) {
            hours = matchByDot[0] || 0;
            minutes = matchByDot[1] || 0;
            minutes = Math.floor(60 * parseFloat('0.' + minutes));
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
        var minutes: any = Math.floor(inputValue / 1000 / 60) % 60;
        var hours: any = Math.floor(inputValue / 1000 / (60 * 60)) % 60;

        minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
        hours = hours.toString().length === 1 ? '0' + hours : hours;

        var dateValue = hours + ':' + minutes;
        return dateValue;
    }

    setViewValue() {
        let model = this.control.model;
        var view = this.modelToView(model);        
        setTimeout(() => this.control.valueAccessor.writeValue(view));
    }

}
