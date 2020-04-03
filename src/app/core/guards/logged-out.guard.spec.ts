import {Router} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {AuthService} from '../authentication/auth.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../shared/interfaces/user';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuard} from './auth.guard';
import {Roles} from '../../shared/enums/roles';
import {LoggedOutGuard} from './logged-out.guard';

describe('LoggedOutGuard', () => {
  let service;
  let router: Router;
  let guard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: class {
            user = new BehaviorSubject<User>(null);
          }},
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
            createUrlTree = jest.fn();
          }
        }],
      imports: [
        RouterTestingModule]
    });
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  describe('canActivate', () => {

    beforeEach(() => {
      guard = new LoggedOutGuard(service, router);
    });
    test('should return true for no user', () => {
      service.user.next(null);
      guard.canActivate().subscribe(
        (result) => {
          expect(result).toBeTruthy();
        }
      );
    });
    test('should call router if user', () => {
      service.user.next(new User('', '', '', Roles.User, '', '', '', '', ''));
      guard.canActivate().subscribe(
        result => {
          expect(router.createUrlTree).toBeCalled();
        }
      );
    });
  });
});
