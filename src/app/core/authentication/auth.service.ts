import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Roles } from './../../shared/enums/roles';
import { LoginResponse } from './../../shared/interfaces/loginResponse';
import { User } from './../../shared/interfaces/user';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, tap, catchError, exhaustMap, take } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private readonly router: Router,
              private readonly toastr: ToastrService) { }


  public register(registerData: {username: string, email: string, password: string}) {
    return this.http.post(
      environment.apiUrl + 'users/register',
      registerData,
    );

  }
  public login(loginData: {username: string, password: string}) {
    return this.http.post<LoginResponse>(
      environment.apiUrl + 'users/login',
      loginData
    ).pipe(
      tap(resData => {
      this.handleAuthentication(
        resData.user.username,
        resData.user.email,
        resData.user.id,
        resData.user.role,
        resData.user.displayname,
        resData.user.bio,
        resData.user.url,
        resData.user.avatarId,
        resData.token);
    }));
  }

  public logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.toastr.success('You have been logged out!');
    this.router.navigate(['login']);
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

  public handleAuthentication(
    username: string,
    email: string,
    id: string ,
    role: Roles,
    displayname: string,
    bio: string,
    url: string,
    avatarId: string,
    token: string) {
    const user = new User(id,
      username,
      email,
      role,
      displayname,
      bio,
      url,
      avatarId,
      token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public relogin(user: User) {
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.toastr.success('Your settings have been updated!');
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
      userData.displayname,
      userData.bio,
      userData.url,
      userData.avatarId,
      userData._token);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }

  }




}
