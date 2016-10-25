import { Component, OnInit, Input } from '@angular/core';

import { Team, Task, RepositoryService} from '../../shared';

@Component({
	selector: 'tt-team-activity',
	templateUrl: './team-activity.component.html'
})

export class TeamActivityComponent implements OnInit {

    activity: Task[] = [];
    @Input() team: Team;
    
    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.repository
            .getTeamActivity(this.team)
            .subscribe(tasks => {
                this.activity = this.activity.concat(tasks)
            });       
    }
}
