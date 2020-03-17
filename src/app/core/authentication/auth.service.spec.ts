/* tslint:disable:no-unused-variable */

import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../shared/AppSettings';
import {User} from '../../shared/interfaces/user';
import {Roles} from '../../shared/enums/roles';

describe('Service: Auth', () => {

  let service: AuthService;
  let http: HttpTestingController;
  let router: Router;
  let toastr: ToastrService;
  const userData = {
    username: 'username',
    displayname: 'displayname',
    email: '',
    role: Roles.User,
    id: '1',
    bio: '',
    url: '',
    avatarId: '',
    _token: 'token'
  };
  const user = new User(userData.id,
    userData.username,
    userData.email,
    userData.role,
    userData.displayname,
    userData.bio,
    userData.url,
    userData.avatarId,
    userData._token);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, ToastrService,
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
          }
        }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()]
    });
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    toastr = TestBed.get(ToastrService);

    localStorage.setItem = jest.fn((key: string, value: string) => {
    });
    localStorage.removeItem = jest.fn((key: string) => {
    });

  });

  describe('Init', () => {
    test('should instantiate', () => {
      expect(service).toBeTruthy();
    });

    test('should initialize with empty user', () => {
      expect(service.user.value).toBeNull();
    });
  });

  describe('login', () => {
    const loginData = {
      username: 'testuser',
      password: 'asdQWE123!@#'
    };

    const loginResponse = {
      token: 'token',
      user: null
    };
    test('should return promise of LoginResponse', () => {
      service.login(loginData).subscribe(
        response => {
          expect(response).toEqual(loginResponse);
        }
      );
      const req = http.expectOne(AppSettings.apiUrl + 'users/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    test('should invoke handleAuthentication', () => {
      service.handleAuthentication = jest.fn();
      service.login(loginData).subscribe(
        response => {
          expect(service.handleAuthentication).toBeCalled();
        }
      );
      const req = http.expectOne(AppSettings.apiUrl + 'users/login');
      req.flush(loginResponse);
    });
  });


  test('register should send http', () => {
    const registerData = {
      username: 'test',
      email: 'test',
      password: 'test'
    };
    service.register(registerData).subscribe(
      response => {
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'users/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  describe('logout', () => {
    test('should inset null into user', () => {
      service.logout();
      expect(service.user.value).toBeNull();
    });

    test('should remove "userData" from local storage', () => {
      service.logout();
      expect(localStorage.removeItem).toBeCalledWith('userData');
    });

    test('should navigate to /login', () => {
      service.logout();
      expect(router.navigate).toBeCalledWith(['login']);
    });
  });

  describe('handleAuthentication', () => {

    test('should insert new user into user', () => {
      service.handleAuthentication(userData.username,
        userData.email,
        userData.id,
        userData.role,
        userData.displayname,
        userData.bio,
        userData.url,
        userData.avatarId,
        userData._token);
      for (const key of Object.keys(service.user.value)) {
        expect(service.user.value[key]).toEqual(user[key]);
      }
    });

    test('should insert new user into localStorage', () => {

      service.handleAuthentication(userData.username,
        userData.email,
        userData.id,
        userData.role,
        userData.displayname,
        userData.bio,
        userData.url,
        userData.avatarId,
        userData._token);
      expect(localStorage.setItem).toBeCalledWith('userData', JSON.stringify(user));
    });
  });

  describe('relogin', () => {
    test('should insert new user into user', () => {
      service.relogin(user);
      expect(service.user.value).toBe(user);
    });

    test('should set userData into local storage', () => {
      service.relogin(user);
      expect(localStorage.setItem).toBeCalledWith('userData', JSON.stringify(user));
    });

    test('should invoke toastr succes', () => {
      jest.spyOn(toastr, 'success').mockClear();
      service.relogin(user);
      expect(toastr.success).toBeCalled();
    });
  });
  describe('autoLogin', () => {
    test('should not change user if userData is null', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null);
      service.autoLogin();
      expect(service.user.value).toBeNull();
    });

    test('should change user', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(user));
      service.autoLogin();
      expect(service.user.value).toEqual(user);
    });
  });
});
