import { Component, OnInit, Input, Output, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'tt-members-modal',
	templateUrl: './members-modal.component.html',
    exportAs: 'membersModal'
})

export class MembersModalComponent implements AfterViewInit {
    // ngOnInit() {
        
    // }

    // public set config(conf:ModalOptions) {
    //     this._config = this.getConfig(conf);
    // };

    @Input() title:string;
    @Output() public onShow:EventEmitter<any> = new EventEmitter();
    @Output() public onShown:EventEmitter<any> = new EventEmitter();
    @Output() public onHide:EventEmitter<any> = new EventEmitter();
    @Output() public onHidden:EventEmitter<any> = new EventEmitter();

    ngAfterViewInit() {

    }

}
