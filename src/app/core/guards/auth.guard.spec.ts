import {AuthGuard} from './auth.guard';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {Roles} from '../../shared/enums/roles';
import {User} from '../../shared/interfaces/user';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject} from 'rxjs';


describe('AuthGuard', () => {
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
      guard = new AuthGuard(service, router);
    });
    test('should return urlTree for no user', () => {
      service.user.next(new User('', '', '', Roles.User, '', '', '', '', ''));
      guard.canActivate().subscribe(
        () => {
          expect(router.createUrlTree).toBeCalledWith(['/login']);
        }
      );
    });
    test('should return false for no user', () => {
      service.user.next(null);
      guard.canActivate().subscribe(
        result => {
          expect(result).toBeFalsy();
        }
      );
    });
  });
});
