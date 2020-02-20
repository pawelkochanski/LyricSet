import { Roles } from './../../shared/enums/roles';
import { LoginResponse } from './../../shared/interfaces/loginResponse';
import { User } from './../../shared/interfaces/user';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }


  public register(registerData: {username: string, email: string, password: string}) {
    return this.http.post(
      environment.apiUrl + 'users/register',
      registerData,
    ).pipe(catchError(this.handleError));

  }
  public login(loginData: {username: string, password: string}) {
    return this.http.post<LoginResponse>(
      environment.apiUrl + 'users/login',
      loginData
    ).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.user.username,
        resData.user.email,
        resData.user.id,
        resData.user.role,
        resData.token,
        resData.exp)
        ;
    }));
  }

  public getUsernames() {
    return this.http.get(
      environment.apiUrl + 'users/usernames'
    )
    .pipe(
      map((responseData: {usernames: string[]}) => {
        return responseData.usernames;
      }));
  }

  public getEmails() {
    return this.http.get(
      environment.apiUrl + 'users/emails'
    ).pipe(
      map((responseData: {emails: string[]}) => {
        return responseData.emails;
      }));

  }

  private handleAuthentication(username: string, email: string, id: string , role: Roles, token: string, tokenExpirationDate: Date ) {
    const user = new User(id,
      username,
      email,
      role,
      token,
      tokenExpirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.status === 400) {
      return throwError('BAD_CREDENTIALS');
    }
    return throwError('SERVER_ERROR');
  }

}
