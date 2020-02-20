import { Router } from '@angular/router';
import { Roles } from './../../shared/enums/roles';
import { LoginResponse } from './../../shared/interfaces/loginResponse';
import { User } from './../../shared/interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private readonly router: Router) { }


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
        resData.token);
    }));
  }

  public logout() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['home']);
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

  private handleAuthentication(username: string, email: string, id: string , role: Roles, token: string) {
    const user = new User(id,
      username,
      email,
      role,
      token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.role,
      userData._token);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }

  }

  private handleError(errorRes: HttpErrorResponse) {
    switch (errorRes.status) {
      case 400:
        return throwError('BAD_CREDENTIALS');
        break;
      default:
        return throwError('SERVER_ERROR');
    }
  }



}
