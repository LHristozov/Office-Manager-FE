import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME } from './auth-constants';
import { HttpParams } from '@angular/common/http';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}&grant_type=password`;

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set(
          'Authorization',
          'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
        )
        .set('withCredentials', 'true')
    };

    // login as admin: userName: 'hristina'
    const user: any = { id: 1, userName: 'hristina1' };
    //   return this.http.post<any>(`${SERVER_DOMAIN}/oauth/token`, body, options
    //         ).pipe(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user && (<any>user).access_token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       //      localStorage.setItem('currentUser', JSON.stringify(user));
    //             localStorage.setItem('currentUser', JSON.stringify({ username: username, user}));

    //         }

    //         return user;
    //     });
    return of(user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
