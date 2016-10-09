// import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';

// @Injectable()

// export class HttpClient {
//     constructor(
//         public http: Http
//     ) { }   

//     get(url, params) {
//         let headers = new Headers();
//         this.createAuthorizationHeader(headers);
//         return this.http.get(url, {
//             headers: headers
//         });
//     }

//     post(url, data) {
//         let headers = new Headers();
//         this.createAuthorizationHeader(headers);
//         return this.http.post(url, data, {
//             headers: headers
//         });
//     }

//     put(url, data) {
//         let headers = new Headers();
//         this.createAuthorizationHeader(headers);
//         return this.http.post(url, data, {
//             headers: headers
//         });
//     }

//     delete(url, data) {
//         let headers = new Headers();
//         this.createAuthorizationHeader(headers);
//         return this.http.post(url, data, {
//             headers: headers
//         });
//     }

//      createAuthorizationHeader(headers: Headers) {
//         headers.append('Authorization', 'Basic ' +
//             btoa('username:password'));
//     }
// }