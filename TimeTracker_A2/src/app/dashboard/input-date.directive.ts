import { Directive, HostListener, ElementRef, Input, OnInit } from "@angular/core";
import { NgModel } from '@angular/forms';

@Directive({
    selector: "[ngModel][inputDate]"
})


export class InputDate implements OnInit {
    
    constructor(
        public model: NgModel
    ) { }

    ngOnInit() {
        console.log('Test');
        // debugger;
    }

}