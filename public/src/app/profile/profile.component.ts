import { Component, OnInit } from '@angular/core';

import { RepositoryService } from '../shared';
import { User } from '../shared';

@Component({
	selector: 'tt-profile',
	templateUrl: './profile.component.html',
    providers: [RepositoryService]
})

export class ProfileComponent implements OnInit {
    currentUser: User;

    constructor(
        private repository: RepositoryService
    ) { }

    ngOnInit() {

        this.repository.getUser().subscribe(
            user => {
                user.avatar = user.avatar.replace(/\?sz=\d*$/, '')
                return this.currentUser = user
            }
        );       

    }
    
}
