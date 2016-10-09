import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../shared';

@Component({
    selector: 'tt-dashboard-footer',
    templateUrl: 'dashboard-footer.component.html'
})
export class DashboardFooterComponent implements OnInit {
    constructor() { }
    @Input() task: Task;

    ngOnInit() { }
}