import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from '../authentication/auth.service';
import {AuthInterceptorService} from './auth-interceptor.service';
import {User} from '../../shared/interfaces/user';
import {AuthServiceSpecStub} from '../authentication/auth.service.spec.stub';

class HttpInterceptorService {
}

describe('authInterceptorService', () => {
  let httpRequestSpy;
  let httpHandlerSpy;
  let authService;
  let httpMock: HttpTestingController;
  let httpInterceptor: HttpInterceptorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HttpInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        },
        {provide: AuthService, useClass: AuthServiceSpecStub}
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    httpInterceptor = TestBed.get(HttpInterceptorService);
    authService = TestBed.get(AuthService);

    httpRequestSpy = {
      clone: jest.fn(), headers: {
        set: jest.fn()
      }
    };
    httpHandlerSpy = {handle: jest.fn()};
  });
  afterEach(() => {
    httpMock.verify();
  });

  test('should create', () => {
    const service = new AuthInterceptorService(authService);
    expect(service).toBeTruthy();
  });
  test('should not clone request if user not logged', () => {
    const service = new AuthInterceptorService(authService);
    service.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      () => {
        expect.assertions(1);
        expect(httpRequestSpy.clone).not.toBeCalled();
      }
    );
  });

  test('should clone request and append bearer if user logged', () => {
    authService.user.next({token: 'token'} as User);
    const service = new AuthInterceptorService(authService);
    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        (user) => {
          expect(httpRequestSpy.clone).toBeCalledWith({
            headers: httpRequestSpy.headers.set(
              'Authorization',
              'Bearer ' +
              user.token)
          });
        }
      );
  });

});


