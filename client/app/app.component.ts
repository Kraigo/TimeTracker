import { Component, ViewContainerRef, OnInit  } from '@angular/core';
import { RepositoryService } from './shared';

@Component({
    selector: 'tt-app',
    templateUrl: './app.component.html',
    providers: [ RepositoryService ]
})

export class AppComponent implements OnInit  {
    public notificationInvitationsCount: number;

    public constructor(
        private viewContainerRef:ViewContainerRef,
        private repository: RepositoryService
    ) {
        this.viewContainerRef = viewContainerRef;
    }

    ngOnInit() {
        this.checkNewInvitations();
    }

    checkNewInvitations() {
        this.repository
            .getInvitations()
            .subscribe(invitations => this.notificationInvitationsCount = invitations.length)
    }
}