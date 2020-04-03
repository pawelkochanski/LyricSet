import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {AuthService} from '../authentication/auth.service';
import {AuthServiceSpecStub} from '../authentication/auth.service.spec.stub';
import {Toast, ToastrService} from 'ngx-toastr';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../shared/interfaces/user';

@Component({
  template: ''
})
class DummyComponent {
}


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let toastr: ToastrService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, DummyComponent],
      imports: [AngularMaterialModule, RouterTestingModule.withRoutes([
        {
          path: 'library', component: DummyComponent
        },
        {
          path: 'bands', component: DummyComponent
        },
        {
          path: 'popular', component: DummyComponent
        },
        {
          path: 'home', component: DummyComponent
        }
      ])],
      providers: [
        {provide: AuthService, useClass: AuthServiceSpecStub},
        {
          provide: ToastrService, useClass: class {
            success = jest.fn();
            error = jest.fn();
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    toastr = TestBed.get(ToastrService);
    fixture.detectChanges();
  });

  test('should instatniate', () => {
    expect(component).toBeTruthy();
    expect(component.isAuthenticated).toBeFalsy();
  });

  test('should change is authenticated if user', fakeAsync(() => {
    authService.user.next({id: '13'} as User);
    tick();
    expect(component.isAuthenticated).toBeTruthy();
  }));

  describe('buttons', () => {

    test('brand-button should navigate to /home', () => {
      const button = fixture.debugElement.nativeElement.querySelector('.brand');
      expect(button.getAttribute('href')).toEqual('/home');
    });

    test('library-button should exist if authenticated and navigate to /library', () => {
      component.isAuthenticated = true;
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('.library-button');
      expect(button.getAttribute('href')).toEqual('/library');
    });

    test('bands-button should exist if authenticated and navigate to /bands', () => {
      component.isAuthenticated = true;
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('.bands-button');
      expect(button.getAttribute('href')).toEqual('/bands');
    });

    test('contact-button should exist if authenticated and navigate to mailto', () => {
      component.isAuthenticated = true;
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('.contact-button');
      expect(button.getAttribute('href')).toEqual('mailto:pok.koch@gmail.com');
    });

    test('mat-menu-panel should not be open at start', () => {
      const panel = fixture.debugElement.nativeElement.querySelector('.mat-menu-panel');
      expect(panel).toBeFalsy();
    });

    test('mat-menu-panel open on click', () => {
      fixture.debugElement.nativeElement.querySelector('.menu-trigger').click();
      fixture.detectChanges();
      const panel = fixture.debugElement.nativeElement.parentNode.querySelector('.mat-menu-panel');
      expect(panel).toBeTruthy();
    });

    test('onLogout should call authService.logout' && 'toastr.succes', () => {
      const spy = jest.spyOn(authService, 'logout');
      component.onLogout();
      expect(spy).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
    });
  });
});
