import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Team, Invitation} from '../shared';

import { MembersModalComponent } from './members-modal/members-modal.component'

@Component({
	selector: 'tt-team',
	templateUrl: './team.component.html'
})

export class TeamComponent implements OnInit {
    teams: Team[] = [];
    invitations: Invitation[] = [];
    newTeam: Team = new Team();
    
    @ViewChild('membersModal') public membersModal: ModalDirective;

    ngOnInit() {
        this.teams.push({
            _id: '1',
            title: 'Test',
            isOwner: true
        });
        // repository.getTeams().then(function(response) {
        //         $scope.teams = response.data;
        //     })

        //     repository.getInvitations().then(function(response) {
        //         $scope.invitations = response.data;
        //     })
    }

    openMembers() {
        this.membersModal.show();
    }
    
    addTeam() {
        
                // repository.addTeam($scope.newTeam.title).then(function(response) {
                //     $scope.teams.push(response.data);
                // })
                // $scope.newTeam = null;

    }

    removeTeam() {
                // modal.confirmation('Are you want to remove team ' + team.title + '?').then(function(confirm) {
                //     repository.removeTeam(team._id).then(function(response) {
                //         $scope.teams.splice($scope.teams.indexOf(team), 1);
                //     })
                // })

    }

    openProjects() {
// modal.open({
//                     templateUrl: "application/team/views/projects.html",
//                     controller: 'ProjectCtrl',
//                     resolve: {
//                         team: team
//                     }
//                 })
    }

    // openMembers() {
        // modal.open({
        //             templateUrl: "application/team/views/members.html",
        //             controller: 'MemberCtrl',
        //             resolve: {
        //                 team: team
        //             }
        //         })

    // }

    acceptInvitation() {
        
                // repository.acceptInvitation(invitation._id).then(function(response) {
                //     $scope.invitations.splice($scope.invitations.indexOf(invitation), 1);
                //     $scope.teams.push(response.data);
                // })

    }
}
