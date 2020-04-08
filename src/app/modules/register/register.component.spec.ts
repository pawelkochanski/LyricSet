import {RegisterComponent} from './register.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/authentication/auth.service';
import {AuthServiceSpecStub} from '../../core/authentication/auth.service.spec.stub';
import {ErrorService} from '../../core/services/error.service';
import {ToastrService} from 'ngx-toastr';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {Errors} from '../../shared/enums/errors';
import {error} from 'util';

@Component({
  template: ''
})
class DummyComponent {

}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let toastr: ToastrService;
  let authService: AuthService;
  let errorService: ErrorService;
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent}
        ])],
      declarations: [RegisterComponent, DummyComponent],
      providers: [
        FormBuilder,
        {provide: AuthService, useClass: AuthServiceSpecStub},
        {
          provide: ErrorService, useClass: class {
            handleError = jest.fn();
          }
        },
        {
          provide: ToastrService, useClass: class {
            error = jest.fn();
            success = jest.fn();
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    toastr = TestBed.get(ToastrService);
    errorService = TestBed.get(ErrorService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  test('should instatiate', () => {
    expect(component).toBeTruthy();
  });

  test('init -> form should be empty on init', () => {
    expect(component.registerForm.controls.username.value).toBe('');
    expect(component.registerForm.controls.email.value).toBe('');
    expect(component.registerForm.controls.password.value).toBe('');
    expect(component.registerForm.controls.repPassword.value).toBe('');
  });

  describe('OnSubmit', () => {
    test('onSubmit should return if form invalid', () => {
      component.registerForm.setErrors({testerror: true});
      const spy = jest.spyOn(authService, 'register');
      component.onSubmit();
      expect(spy).not.toHaveBeenCalled();
    });

    test('onSubmit should call register if form valid', () => {
      component.registerForm.controls.username.setValue('username');
      component.registerForm.controls.email.setValue('pok.koch@gmail.com');
      component.registerForm.controls.password.setValue('asdQWE123!@#');
      component.registerForm.controls.repPassword.setValue('asdQWE123!@#');
      const spy = jest.spyOn(authService, 'register');
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });

    test('onSubmit should call toastr.succse if response ok', () => {
      component.registerForm.controls.username.setValue('username');
      component.registerForm.controls.email.setValue('pok.koch@gmail.com');
      component.registerForm.controls.password.setValue('asdQWE123!@#');
      component.registerForm.controls.repPassword.setValue('asdQWE123!@#');
      const spy = jest.spyOn(authService, 'register').mockReturnValueOnce(of({}));
      const routerspy = jest.spyOn(router, 'navigate').mockImplementation();
      component.onSubmit();
      fixture.detectChanges();
      expect(toastr.success).toHaveBeenCalled();
      expect(routerspy).toHaveBeenCalled();
    });

    test('should call handleError on error', () => {
      component.registerForm.controls.username.setValue('username');
      component.registerForm.controls.email.setValue('pok.koch@gmail.com');
      component.registerForm.controls.password.setValue('asdQWE123!@#');
      component.registerForm.controls.repPassword.setValue('asdQWE123!@#');
      const spy = jest.spyOn(authService, 'register').mockReturnValueOnce(throwError(new Error()));
      component.onSubmit();
      expect(errorService.handleError).toHaveBeenCalled();
    });

    test('should set username error  on username error', () => {
      component.registerForm.controls.username.setValue('username');
      component.registerForm.controls.email.setValue('pok.koch@gmail.com');
      component.registerForm.controls.password.setValue('asdQWE123!@#');
      component.registerForm.controls.repPassword.setValue('asdQWE123!@#');
      const spy = jest.spyOn(authService, 'register').mockReturnValueOnce(throwError(new Error()));
      jest.spyOn(errorService, 'handleError').mockReturnValue(Errors.USERNAME_EXISTS);
      component.onSubmit();
      expect(component.registerForm.controls.username.getError('notUnique')).toBeTruthy();
    });

    test('should set email error  on email error', () => {
      component.registerForm.controls.username.setValue('username');
      component.registerForm.controls.email.setValue('pok.koch@gmail.com');
      component.registerForm.controls.password.setValue('asdQWE123!@#');
      component.registerForm.controls.repPassword.setValue('asdQWE123!@#');
      const spy = jest.spyOn(authService, 'register').mockReturnValueOnce(throwError(new Error()));
      jest.spyOn(errorService, 'handleError').mockReturnValue(Errors.EMAIL_EXISTS);
      component.onSubmit();
      expect(component.registerForm.controls.email.getError('notUnique')).toBeTruthy();
    });
  });


  test('click on already have accoun should redirect to /login', () => {
    fixture.debugElement.nativeElement.querySelector('a').click();
    fixture.detectChanges();
    expect(location.path()).toEqual('/login');
  });
});
