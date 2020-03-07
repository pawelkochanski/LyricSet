import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Roles} from '../../shared/enums/roles';
import {LoginResponse} from '../../shared/interfaces/loginResponse';
import {User} from '../../shared/interfaces/user';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {PasswordData} from '../../shared/interfaces/passwordData';
import {UsernameData} from '../../shared/interfaces/usernameData';
import {LoginData} from '../../shared/interfaces/loginData';
import {RegisterData} from '../../shared/interfaces/registerData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private readonly router: Router,
              private readonly toastr: ToastrService) {
  }


  public register(registerData: RegisterData): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'users/register',
      registerData,
    );

  }

  public login(loginData: LoginData): Observable<LoginResponse> {
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

  public logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }


  public handleAuthentication(
    username: string,
    email: string,
    id: string,
    role: Roles,
    displayname: string,
    bio: string,
    url: string,
    avatarId: string,
    token: string): void {
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

  public relogin(user: User): void {
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.toastr.success('Your settings have been updated!');
  }

  autoLogin(): void {

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

  changePassword(paswordData: PasswordData): Observable<any> {
    return this.http.put(
      environment.apiUrl + 'users/password',
      paswordData);
  }

  changeUsername(usernameData: UsernameData): Observable<any> {
    return this.http.put(
      environment.apiUrl + 'users/username',
      usernameData
    );
  }


}
