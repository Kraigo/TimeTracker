import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Team, Invitation, RepositoryService} from '../shared';

import { MembersModalComponent } from './members-modal/members-modal.component'

@Component({
	selector: 'tt-team',
	templateUrl: './team.component.html'
})

export class TeamComponent implements OnInit {
    teams: Team[] = [];
    invitations: Invitation[] = [];
    newTeamTitle: string;
    selectedTeam: Team;
    
    @ViewChild('membersModal') public membersModal: ModalDirective;
    @ViewChild('projectsModal') public projectsModal: ModalDirective;

    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.repository
            .getTeams()
            .subscribe(teams => this.teams = this.teams.concat(teams))
    }

    openMembers(team: Team) {
        this.selectedTeam = team;
        this.membersModal.show();
    }

    openProjects(team: Team) {
        this.selectedTeam = team;
        this.projectsModal.show();
    }
    
    addTeam() {
        this.repository
            .addTeam(this.newTeamTitle)
            .subscribe(team => this.teams.push(team));
            
        this.newTeamTitle = '';

    }

    removeTeam(team: Team) {

        // TODO: Confirmation Modal
        // 'Are you want to remove team ' + team.title + '?'
        this.repository
            .removeTeam(team)
            .subscribe(() => {
                this.teams.splice(this.teams.indexOf(team), 1);
            })


    }

    acceptInvitation(invitation: Invitation) {
        this.repository
            .acceptInvitation(invitation)
            .subscribe(team => {
                this.invitations.splice(this.invitations.indexOf(invitation), 1);
                this.teams.push(team)
            })
    }
}