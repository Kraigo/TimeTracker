import { Component, OnInit } from '@angular/core';
import { User } from '../shared';

@Component({
	selector: 'tt-profile',
	templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    currentUser: User;

    ngOnInit() {
        this.currentUser = {
            firstName: 'Igor',
            lastName: 'K',
            email: 'e@ma.il',
            avatar: 'ava'
        }
    }
    
}
