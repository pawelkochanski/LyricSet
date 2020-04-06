import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {LibraryComponent} from './library.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../core/services/mysets.service.spec.stub';

describe('LibraryComponent', () => {

  let fixture: ComponentFixture<LibraryComponent>;
  let component: LibraryComponent;
  let setService: MysetsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule],
      declarations: [
        LibraryComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: MysetsService, useClass: MysetsServiceSpecStub
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    setService = TestBed.get(MysetsService);
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  test('init', () => {
    const spy = jest.spyOn(setService, 'refreshSetlist');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(setService.isGuestMode).toBeFalsy();
  });

  test('destroy', () => {
    component.ngOnDestroy();
    expect(setService.mysetlist).toEqual([]);
    expect(setService.activeSet).toBeNull();
  });

  test('should show spinner if loading', () => {
    setService.isLoading = true;
    fixture.detectChanges();
    const loading = fixture.debugElement.nativeElement.querySelector('.loading');
    expect(loading).toBeTruthy();
  });
});
