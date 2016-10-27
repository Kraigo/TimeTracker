import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { Task } from './models/task.model';
import { User } from './models/user.model';
import { Project } from './models/project.model';
import { Team } from './models/team.model';
import { Invitation } from './models/invitation.model';
import { Category } from './models/category.model';

import { HttpClient } from '../app.interceptor';

@Injectable()

export class RepositoryService {
    baseUrl: string = '/api';

    constructor(private http: HttpClient) { }

    // USER //

    getUser(): Observable<User> {
        let url: string = this.baseUrl + '/user';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as User);
    }

    getTasks(weekStart?: Date): Observable<Task[]> {
        let url = this.baseUrl + '/tasks';
        let params = new URLSearchParams();
        params.set('weekStart', weekStart ? weekStart.toISOString() : null);

        return this.http
            .get(url, {search: params})
            .map((r: Response) => r.json().map(task => new Task(task)))
    }

    getActiveTask(weekStart: Date): Observable<Task> {
        let url = this.baseUrl + '/tasks';        
        return this.http
            .get(url)
            .map((r: Response) => r.json() as Task);
    }

    saveTask(task: Task): Observable<Task> {
        let url = this.baseUrl + '/tasks';
        let body = {
            description: task.description,
            project: task.project,
            category: task.category,
            time: task.time,
            date: task.date,
            lastTrack: task.lastTrack,
            isTracking: task.isTracking
        }
        return task._id
        ? this.http
            .put(url + `/${task._id}`, body)
            .map((r: Response) => r.json() as Task)
        : this.http
            .post(url, body)
            .map((r: Response) => r.json() as Task)
    }

    removeTask(task: Task): Observable<string> {
        let url = this.baseUrl + `/tasks/${task._id}`; 
        return this.http
            .delete(url)
            .map((r: Response) => r.text());
    }

    // TEAM //

    getTeams(): Observable<Team[]> {
        let url = this.baseUrl + '/teams';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as Team[]);
    }

    addTeam(title: string): Observable<Team> {
        let url = this.baseUrl + '/teams';
        let body = {title: title}
        return this.http
            .post(url, body)
            .map((r: Response) => r.json() as Team);
    }
    
    removeTeam(team: Project): Observable<string> {
        let url = this.baseUrl + `/teams/${team._id}`;
        return this.http
            .delete(url)
            .map((r: Response) => r.text());
    }
    
    removeTeamMember(team: Team, user: User): Observable<any> {
        let url = this.baseUrl + '/teams/leave';
        let body = {
            team: team._id,
            user: user._id
        }
        return this.http
            .put(url, body)
            .map((r: Response) => r.text());
    }

    getTeamActivity(team: Team, dateStart?: Date): Observable<Task[]> {
        let url = this.baseUrl + `/teams/${team._id}/activity`;
        let params = new URLSearchParams();
        params.set('dateStart', dateStart ? dateStart.toISOString() : null);

        return this.http
            .get(url, {search: params})
            .map((r: Response) => r.json() as Task[]);
    }

     // PROJECT //

    getProjects(): Observable<Project[]> {
        let url = this.baseUrl + '/projects';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as Project[]);
    }

    addProject(team: Team, title: string): Observable<Project[]> {
        let url = this.baseUrl + '/projects';
        let body = { team: team._id, title: title }
        return this.http
            .post(url, body)
            .map((r: Response) => r.json() as Project[]);
    }

    removeProject(project: Project): Observable<string> {
        let url = this.baseUrl + `/projects/${project._id}`;
        return this.http
            .delete(url)
            .map((r: Response) => r.text());
    }

     // Categories //

    getCategories(): Observable<Category[]> {
        let url = this.baseUrl + '/categories';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as Category[]);
    }

    addCategory(team: Team, title: string): Observable<Category[]> {
        let url = this.baseUrl + '/categories';
        let body = { team: team._id, title: title }
        return this.http
            .post(url, body)
            .map((r: Response) => r.json() as Category[]);
    }

    removeCategory(category: Category): Observable<string> {
        let url = this.baseUrl + `/categories/${category._id}`;
        return this.http
            .delete(url)
            .map((r: Response) => r.text());
    }

    // INVITATION //

    getInvitations(): Observable<Invitation[]> {
        let url = this.baseUrl + '/invitations';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as Invitation[]);
    }

    addInvitation(team: Team, email: string): Observable<Invitation> {
        let url = this.baseUrl + '/invitations';
        let body = {team: team._id, email: email}
        return this.http
            .post(url, body)
            .map((r: Response) => r.json() as Invitation);
    }
    
    acceptInvitation(invitation: Invitation): Observable<Team> {
        let url = this.baseUrl + '/invitations/accept';
        let body = {id: invitation._id}
        return this.http
            .put(url, body)
            .map((r: Response) => r.json() as Team);
    }
    removeInvitation(invitation: Invitation): Observable<string> {
        let url = this.baseUrl + `/invitations/${invitation._id}`;
        return this.http
            .delete(url)
            .map((r: Response) => r.text());
    }
}