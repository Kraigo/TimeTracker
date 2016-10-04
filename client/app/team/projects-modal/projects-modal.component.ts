import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component.js';

import { Team, Project } from '../../shared';

@Component({
	selector: 'tt-projects-modal',
	templateUrl: './projects-modal.component.html',
    exportAs: 'modal'
})

export class ProjectsModalComponent implements AfterViewInit {

    @ViewChild('modal') public modal: ModalDirective;

    @Input() team: Team;
    
    ngAfterViewInit() { }

    newProjectTitle: string;   

    show(){
        this.modal.show(); 
    }

    addProject(team, title) {
        // $scope.newProjectTitle = '';

        //         repository.addProject(team._id, title).then(function(response) {
        //             // team.projects.push(response.data);
        //             team.projects = response.data;
        //         })

    }

    removeProject(project, team) {
// repository.removeProject(project._id).then(function(response) {
//                     team.projects.splice(team.projects.indexOf(project), 1)
//                 })
    }
}
