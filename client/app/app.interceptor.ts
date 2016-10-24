import {window} from 'd:/Projects/TimeTracker/node_modules/rxjs/operator/window';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class HttpClient {
    constructor(
        public http: Http,
        private router: Router
    ) { }   

    get(url, params?) {
        return this.http.get(url, params)
            .catch(error => this.handleError(error));
    }

    post(url, body) {
        return this.http.post(url, body)
            .catch(error => this.handleError(error));
    }

    put(url, body) {
        return this.http.put(url, body)
            .catch(error => this.handleError(error));
    }

    delete(url) {
        return this.http.delete(url)
            .catch(error => this.handleError(error));
    }

    handleError(error: any) {
        
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg);

        if (error.status == 403 || error.status == 401) {
             this.router.navigateByUrl('/login');
        }

        return Observable.throw(errMsg);
    }
}