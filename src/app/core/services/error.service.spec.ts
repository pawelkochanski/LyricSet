import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {Errors} from '../../shared/enums/errors';
import {AuthServiceSpecStub} from '../authentication/auth.service.spec.stub';

describe('ErrorService', () => {
  let router: Router;
  let authService: AuthService;
  let toastr: ToastrService;
  let service: ErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule, ToastrModule.forRoot()],
        providers: [{
          provide: AuthService, useClass: AuthServiceSpecStub}
        ,
          {
            provide: Router, useClass: class {
              navigate = jest.fn();
            }
          },
          {
            provide: ToastrService, useClass: class {
              success = jest.fn();
              error = jest.fn();
            }
          }]
      }
    );
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    toastr = TestBed.get(ToastrService);
    service = new ErrorService(router, authService, toastr);
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    let errorResponseMock;
    beforeEach(() => {
      errorResponseMock = {
        error: {
          message: 'message'
        },
        status: 400
      };
    });

    test('should return null if status other than 4XX or 5XX', () => {
      errorResponseMock.status = 300;
      expect(service.handleError(errorResponseMock)).toBeNull();
    });

    test('should return proper Error from message', () => {
      errorResponseMock.status = 400;
      errorResponseMock.error.message = 'username is required';
      expect(service.handleError(errorResponseMock)).toBe(Errors.USERNAME_REQUIRED);
    });

    test('should invoke toastr error ' && ' return null if message unknown', () => {
      errorResponseMock.status = 400;
      errorResponseMock.error.message = ' someMessage';
      expect(service.handleError(errorResponseMock)).toBe(Errors.BAD_REQUEST);
      expect(toastr.error).toBeCalled();
    });

    test('should logout' && 'redirect' && 'error toastr on 401', () => {
      errorResponseMock.status = 401;
      const spy = jest.spyOn(authService, 'logout');
      expect(service.handleError(errorResponseMock)).toEqual(Errors.UNAUTHORIZED);
      expect(toastr.error).toBeCalled();
      expect(spy).toHaveBeenCalled();
    });

    test('should navigate && return NotFound on 404', () => {
      errorResponseMock.status = 404;
      expect(service.handleError(errorResponseMock)).toEqual(Errors.NOT_FOUND);
      expect(router.navigate).toBeCalled();
    });
  });
});
