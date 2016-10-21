import { Component, OnInit } from '@angular/core';

import { Task, Project, Week, RepositoryService} from '../shared';
import * as moment from 'moment';

@Component({
	selector: 'tt-report',
	templateUrl: './report.component.html'
})

export class ReportComponent implements OnInit {
    tasks: Task[] = [];
    projects: Project[] = [];
    weeks: Week[] = [];

    search: Object = {
        project: ''
    };

    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.repository
            .getTasks()
            .subscribe(tasks => {
                this.tasks = this.tasks.concat(tasks)
                this.divideTasksByWeeks(tasks)
            });
        
        this.repository
            .getProjects()
            .subscribe(projects => this.projects = this.projects.concat(projects));        
    }

    divideTasksByWeeks(tasks) {
        tasks
        .sort( (a,b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        })
        .forEach(task => {
            let weekDate = moment(task.date).isoWeekday('Monday').toDate();

            for (let week of this.weeks) {
                if (week.date.getTime() == weekDate.getTime()) {
                    week.tasks.push(task);
                    return;
                }
            }
            let week = new Week(weekDate);   
            week.tasks.push(task);

            this.weeks.push(week);

        }, this);

        this.weeks
        .sort( (a,b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })
    }

}
