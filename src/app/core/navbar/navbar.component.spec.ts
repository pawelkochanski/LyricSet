import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

describe('NavbarComponent (integrated)', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [NavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should navigate to /home', async(() => {
    const link = fixture.debugElement.nativeElement.querySelector('.brand');
    link.click();

    expect(router.navigateByUrl).toHaveBeenCalled();
  }));

  test('should navigate to /library', async(() => {
    const link = fixture.debugElement.nativeElement.querySelector('[routerLinkActive]');
    link.click();

    expect(router.navigateByUrl).toHaveBeenCalled();
  }));
});
