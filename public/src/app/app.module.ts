import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
/* Custom */
import { Ng2BootstrapModule, ModalModule, DropdownModule  } from 'ng2-bootstrap/ng2-bootstrap';

/* App */
import { AppComponent }   from './app.component';
import { DashboardComponent, ExpandFocus, InputDate } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent } from './report';
import { TeamComponent, MembersModalComponent, ProjectsModalComponent } from './team';


import { RepositoryService, TimeToDatePipe, TaskProjectPipe, TasksTimePipe } from './shared';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,

        Ng2BootstrapModule,
        ModalModule,
        DropdownModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ProfileComponent,
        ReportComponent,
        TeamComponent,
        MembersModalComponent,
        ProjectsModalComponent,
        
        ExpandFocus,
        InputDate,

        // Pipe
        TimeToDatePipe,
        TaskProjectPipe,
        TasksTimePipe
    ],
    providers: [
        RepositoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }