import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
/* Custom */
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

/* App */
import { AppComponent }   from './app.component';
import { DashboardComponent, ExpandFocus, InputDate } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent } from './report';
import { TeamComponent } from './team';
import { MembersModalComponent } from './team/members-modal/members-modal.component';


import { RepositoryService } from './shared';

import { routing } from './app.routing';

import { SecondsToDatetimePipe  } from './dashboard/seconds-to-datetime.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ModalModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ProfileComponent,
        ReportComponent,
        TeamComponent,
        MembersModalComponent,
        
        ExpandFocus,
        InputDate,
        SecondsToDatetimePipe
    ],
    providers: [
        RepositoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }