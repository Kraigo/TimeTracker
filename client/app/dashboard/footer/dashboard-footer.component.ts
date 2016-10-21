import { Component, OnInit, Input, Output, EventEmitter, trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import { Task } from '../../shared';

@Component({
    selector: 'tt-dashboard-footer',
    templateUrl: 'dashboard-footer.component.html',
    animations: [
        trigger('currentTask', [
            state('in', style({transform: 'translateY(0)'})),
            transition('void => *', [
                style({transform: 'translateY(100%)'}),
                animate(100, style({transform: 'translateY(0%)'}))
            ]),
            transition('* => void', [                
                style({transform: 'translateY(0%)'}),
                animate(100, style({transform: 'translateY(100%)'}))
            ])
        ])
    ]
})
export class DashboardFooterComponent implements OnInit {
    constructor() { }
    @Input() task: Task;
    @Input() projects: Task;
    @Output() trackTackEvent: EventEmitter<any> = new EventEmitter();
    @Output() taskChangedEvent: EventEmitter<any> = new EventEmitter();
    @Output() gotoTaskDate: EventEmitter<any> = new EventEmitter();

    ngOnInit() {}

    trackTask(task: Task) {
        this.trackTackEvent.emit(task);
    }

    taskChanged(task: Task) {
        this.taskChangedEvent.emit(task);
    }

    gotoTask() {
        this.gotoTaskDate.emit(this.task.date);
    }
}