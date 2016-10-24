import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Team, Project, RepositoryService } from '../../shared';

@Component({
	selector: 'tt-projects-modal',
	templateUrl: './projects-modal.component.html',
    exportAs: 'modal'
})

export class ProjectsModalComponent implements AfterViewInit {
    
    newProjectTitle: string;

    constructor(        
        public repository: RepositoryService
    ) {}

    @ViewChild('modal') public modal: ModalDirective;

    @Input() team: Team;
    
    ngAfterViewInit() { }

    show(){
        this.modal.show(); 
    }

    addProject(team, title) {
        this.repository
            .addProject(team, title)
            .subscribe(projects => this.team.projects = projects);
            
        this.newProjectTitle = '';

    }

    removeProject(project) {
        this.repository
            .removeProject(project)
            .subscribe(res => this.team.projects.splice(this.team.projects.indexOf(project), 1));
    }
}
