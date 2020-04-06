import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MysetsService} from '../../../../core/services/mysets.service';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {SetListItemComponent} from './set-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SetListItemComponent', () => {
  let fixture: ComponentFixture<SetListItemComponent>;
  let component: SetListItemComponent;
  let setService: MysetsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule],
      declarations: [
        SetListItemComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: MysetsService, useClass: MysetsServiceSpecStub
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListItemComponent);
    component = fixture.componentInstance;
    setService = TestBed.get(MysetsService);
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });
});
