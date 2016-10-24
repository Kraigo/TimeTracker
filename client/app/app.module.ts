import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
/* Custom */
import { ModalModule, DropdownModule  } from 'ng2-bootstrap/ng2-bootstrap';

/* App */
import { HttpClient } from './app.interceptor';
import { AppComponent }   from './app.component';
import { DashboardComponent, DashboardFooterComponent, ExpandFocus, InputDate } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent, GroupTasksByWeekPipe } from './report';
import { TeamComponent, MembersModalComponent, ProjectsModalComponent } from './team';


import { RepositoryService, TimeToDatePipe, TaskProjectPipe, TasksTimePipe, ArrayFilterPipe } from './shared';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,

        ModalModule,
        DropdownModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardFooterComponent,
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
        TasksTimePipe,
        ArrayFilterPipe,
        GroupTasksByWeekPipe
    ],
    providers: [
        RepositoryService,
        HttpClient
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }