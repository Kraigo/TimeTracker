import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Team, Project, User, Invitation, RepositoryService } from '../../shared';

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
            .subscribe(invitation => {
                this.team.invitations.push(invitation)
            })

    }

    removeMember(team: Team, user: User) {
        this.repository
            .removeTeamMember(team, user)
            .subscribe(res => {
                this.team.users.splice(this.team.users.indexOf(user), 1)
            })
    }

    removeInvitation(invitation: Invitation) {
        this.repository
            .removeInvitation(invitation)
            .subscribe(res => {
                this.team.invitations.splice(this.team.invitations.indexOf(invitation), 1)
            })
    }

}
