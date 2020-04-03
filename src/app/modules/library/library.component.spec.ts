import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LibraryComponent} from './library.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../core/services/mysets.service.spec.stub';
import {Test} from 'tslint';

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
});
