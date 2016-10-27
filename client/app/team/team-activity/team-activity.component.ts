import { Component, OnInit, Input } from '@angular/core';

import { Team, Task, RepositoryService} from '../../shared';

@Component({
	selector: 'tt-team-activity',
	templateUrl: './team-activity.component.html'
})

export class TeamActivityComponent implements OnInit {

    activity: Task[] = [];
    loaded: boolean;
    @Input() team: Team;
    
    constructor(
        public repository: RepositoryService
    ) {}

    ngOnInit() {
        this.loaded = false;
        
        this.repository
            .getTeamActivity(this.team)
            .subscribe(tasks => {
                this.activity = this.activity
                    .concat(tasks)
                    .sort((a:Task, b:Task) => {
                        let dateA = new Date(a.date);
                        let dateB = new Date(b.date);
                        return dateB.getTime() - dateA.getTime();
                    });
                this.loaded = true;
            });       
    }
}
