import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent, ExpandFocus, InputDate } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent } from './report';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ProfileComponent,
        ReportComponent,
        
        ExpandFocus,
        InputDate
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }