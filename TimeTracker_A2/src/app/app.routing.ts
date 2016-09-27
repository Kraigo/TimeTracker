import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { ReportComponent } from './report';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'report',
        component: ReportComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);