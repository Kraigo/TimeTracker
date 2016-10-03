import { Component, OnInit } from '@angular/core';

import { Task, Project, RepositoryService} from '../shared';

@Component({
	selector: 'tt-report',
	templateUrl: './report.component.html'
})

export class ReportComponent implements OnInit {
    tasks: Task[] = [];
    projects: Project[] = [];

    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.repository
            .getTasks()
            .subscribe(tasks => this.tasks = this.tasks.concat(tasks));
        
        this.repository
            .getProjects()
            .subscribe(projects => this.projects = this.projects.concat(projects));        
    }

}
