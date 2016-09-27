import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { DashboardComponent, expandFocus } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent } from './report';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ProfileComponent,
        ReportComponent,
        expandFocus
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }