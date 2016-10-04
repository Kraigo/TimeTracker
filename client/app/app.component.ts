import { Component, ViewContainerRef  } from '@angular/core';

@Component({
    selector: 'tt-app',
    templateUrl: './app.component.html',
    providers: [ ]
})

export class AppComponent  {
    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}