import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component.js';
import { Team, Project, RepositoryService } from '../../shared';

@Component({
	selector: 'tt-members-modal',
	templateUrl: './members-modal.component.html',
    exportAs: 'modal'
})

export class MembersModalComponent implements AfterViewInit {

    @ViewChild('modal') public modal: ModalDirective;

    @Input() team: Team;

    ngAfterViewInit() { }

    constructor(
        public repository: RepositoryService
    ) {}

    show(){
        this.modal.show(); 
    }

    addMember(team: Team, email: string) {
        this.repository
            .addInvitation(team, email)
            .subscribe(invitation => this.team.invitations.push(invitation))

    }

    removeMember(project: Project, team: Team) {
    }

}
