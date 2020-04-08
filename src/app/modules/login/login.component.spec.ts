import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/authentication/auth.service';
import {AuthServiceSpecStub} from '../../core/authentication/auth.service.spec.stub';
import {Router} from '@angular/router';
import {ErrorService} from '../../core/services/error.service';
import {ToastrService} from 'ngx-toastr';
import {Component, inject} from '@angular/core';
import {of, throwError} from 'rxjs';
import {User} from '../../shared/interfaces/user';
import {LoginResponse} from '../../shared/interfaces/loginResponse';
import {Errors} from '../../shared/enums/errors';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  template: ''
})
class DummyComponent {
}

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let toastr: ToastrService;
  let authService: AuthService;
  let errorService: ErrorService;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [
          {path: 'library', component: DummyComponent},
          {path: 'register', component: DummyComponent}
        ]
      )],
      declarations: [LoginComponent, DummyComponent],
      providers: [
        {provide: AuthService, useClass: AuthServiceSpecStub},
        {
          provide: ErrorService, useClass: class {
            handleError = jest.fn();
          }
        },
        {
          provide: ToastrService, useClass: class {
            success = jest.fn();
            error = jest.fn();
          }
        },
        FormBuilder,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    toastr = TestBed.get(ToastrService);
    authService = TestBed.get(AuthService);
    errorService = TestBed.get(ErrorService);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  test('init', () => {
    expect(component.loginForm.controls.username.value).toBe('');
    expect(component.loginForm.controls.password.value).toBe('');
  });

  test('on Submit should return if loginForm is invalid', () => {
    component.loginForm.setErrors({error: true});
    const spy = jest.spyOn(authService, 'login');
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  test('on Submit should call login if loginForm is valid', () => {
    component.loginForm.controls.username.setValue('testuser');
    component.loginForm.controls.password.setValue('asdQWE123!@#');
    const spy = jest.spyOn(authService, 'login');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  test('on Submit should call login if loginForm is valid', () => {
    component.loginForm.controls.username.setValue('testuser');
    component.loginForm.controls.password.setValue('asdQWE123!@#');
    const spy = jest.spyOn(router, 'navigate');
    jest.spyOn(authService, 'login').mockReturnValue(of({user: {username: 'testuser'}} as LoginResponse));
    component.onSubmit();
    expect(spy).toBeCalled();
  });

  test('on Submit should call errorSerbice if error', () => {
    component.loginForm.controls.username.setValue('testuser');
    component.loginForm.controls.password.setValue('asdQWE123!@#');
    jest.spyOn(authService, 'login').mockReturnValue(throwError(new Error()));
    component.onSubmit();
    expect(errorService.handleError).toBeCalled();
  });

  test('handleErrors should call reset if error is passwordRequired', () => {
    // @ts-ignore
    component.handleErrors(Errors.PASSWORD_REQUIRED);
    expect(toastr.error).toHaveBeenCalled();
  });

  test('should navigate to register on a click', () => {
    const a = fixture.debugElement.query(By.css('a')).nativeElement.click();
    fixture.detectChanges();
    expect(location.path()).toEqual('/register');
  });
});
