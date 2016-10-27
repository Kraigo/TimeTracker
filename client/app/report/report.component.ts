import { Component, OnInit } from '@angular/core';

import { Task, Project, Week, Category, RepositoryService} from '../shared';

@Component({
	selector: 'tt-report',
	templateUrl: './report.component.html'
})

export class ReportComponent implements OnInit {
    tasks: Task[] = [];
    projects: Project[] = [];
    categories: Category[] = [];
    weeks: Week[] = [];

    search: Object = {
        project: '',
        category: ''
    };

    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.repository
            .getTasks()
            .subscribe(tasks => {
                this.tasks = this.tasks.concat(tasks);
            });
        
        this.repository
            .getProjects()
            .subscribe(projects => {
                this.projects = this.projects.concat(projects);
            });
        
        this.repository
            .getCategories()
            .subscribe(categories => {
                this.categories = this.categories.concat(categories);
            }); 
    }

}
