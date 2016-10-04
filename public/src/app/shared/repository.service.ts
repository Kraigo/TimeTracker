import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Task } from './models/task.model';
import { User } from './models/user.model';
import { Project } from './models/project.model';
import { Team } from './models/team.model';
import { Invitation } from './models/invitation.model';

@Injectable()

export class RepositoryService {
    baseUrl: string = '/api';
    tasksUrl: string = this.baseUrl + '/tasks';
    projectsUrl: string = this.baseUrl + '/projects';
    teamsUrl: string = this.baseUrl + '/teams';
    invitationsUrl: string = this.baseUrl + '/invitations';
    headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    // search(term: string): Observable<Hero[]> {
    //     return this.http
    //         .get(`app/heroes/?name=${term}`)
    //         .map((r: Response) => r.json().data as Hero[])
    //        .catch((error:any) => Observable.throw(error.text()));
    // }

    // USER //

    getUser(): Observable<User> {
        let url: string = this.baseUrl + '/user';
        return this.http
            .get(url)
            .map((r: Response) => r.json() as User);
    }

    getTasks(weekStart?: Date): Observable<Task[]> {
        var params = { weekStart: weekStart };

        return this.http
            .get(this.tasksUrl, params)
            .map((r: Response) => r.json().map(task => new Task(task)));
    }

    getActiveTask(weekStart: Date): Observable<Task> {
        return this.http
            .get(this.tasksUrl)
            .map((r: Response) => r.json() as Task);
    }

    saveTask(task: Task): Observable<Task> {
        return task._id
        ? this.http
            .put(this.tasksUrl + `/${task._id}`, JSON.stringify(task), this.options)
            .map((r: Response) => r.json() as Task)
        : this.http
            .post(this.tasksUrl, JSON.stringify(task))
            .map((r: Response) => r.json().data as Task);
    }

    removeTask(task: Task): Observable<string> {
        return this.http
            .delete(this.tasksUrl + `/${task._id}`)
            .map((r: Response) => r.text());
    }

    // TEAM //

    getTeams(): Observable<Team[]> {
        return this.http
            .get(this.teamsUrl)
            .map((r: Response) => r.json() as Team[]);
    }

    addTeam(title: string): Observable<Team> {
        let body = {title: title}
        return this.http
            .post(this.teamsUrl, body)
            .map((r: Response) => r.json() as Team);
    }
    
    removeTeam(team: Project): Observable<string> {
        return this.http
            .delete(this.teamsUrl + `/${team._id}`)
            .map((r: Response) => r.text());
    }

     // PROJECT //

    getProjects(): Observable<Project[]> {
        return this.http
            .get(this.projectsUrl)
            .map((r: Response) => r.json() as Project[]);
    }

    addProject(team: Team, title: string): Observable<Team> {
        let body = { team: team._id, title: title }
        return this.http
            .post(this.projectsUrl, body)
            .map((r: Response) => r.json() as Team);
    }

    removeProject(project: Project): Observable<string> {
        return this.http
            .delete(this.tasksUrl + `/${project._id}`)
            .map((r: Response) => r.text());
    }

    // INVITATION //

    getInvitations(): Observable<Invitation[]> {
        return this.http
            .get(this.invitationsUrl)
            .map((r: Response) => r.json() as Invitation[]);
    }

    addInvitation(team: Team, email: string): Observable<Invitation> {
        let body = {team: team._id, email: email}
        return this.http
            .post(this.invitationsUrl, body)
            .map((r: Response) => r.json() as Invitation);
    }
    
    acceptInvitation(invitation: Invitation): Observable<Team> {
        let body = {id: invitation._id}
        return this.http
            .put(this.invitationsUrl + '/accept', body)
            .map((r: Response) => r.json() as Team);
    }
}