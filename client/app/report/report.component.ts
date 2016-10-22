import { Component, OnInit } from '@angular/core';

import { Task, Project, Week, RepositoryService} from '../shared';

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
            });
        
        this.repository
            .getProjects()
            .subscribe(projects => this.projects = this.projects.concat(projects));        
    }

}
