import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Team, Category, RepositoryService } from '../../shared';

@Component({
	selector: 'tt-categories-modal',
	templateUrl: './categories-modal.component.html',
    exportAs: 'modal'
})

export class CategoriesModalComponent implements AfterViewInit {
    
    newCategoryTitle: string;

    constructor(        
        public repository: RepositoryService
    ) {}

    @ViewChild('modal') public modal: ModalDirective;

    @Input() team: Team;
    
    ngAfterViewInit() { }

    show(){
        this.modal.show(); 
    }

    addCategory(team: Team, title: string) {
        this.repository
            .addCategory(team, title)
            .subscribe(categories => this.team.categories = categories);
            
        this.newCategoryTitle = '';

    }

    removeCategory(category: Category) {
        this.repository
            .removeCategory(category)
            .subscribe(res => this.team.categories.splice(this.team.categories.indexOf(category), 1));
    }
}
