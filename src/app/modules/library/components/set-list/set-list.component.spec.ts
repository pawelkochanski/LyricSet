import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {SetListComponent} from './set-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {MatDialog} from '@angular/material';
import {of} from 'rxjs';

class DialogMock {
  afterClosed = () => of(null);
}

describe('SetListComponent', () => {

  let component: SetListComponent;
  let fixture: ComponentFixture<SetListComponent>;
  let setService: MysetsService;
  let dialog: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [SetListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: MysetsService, useClass: MysetsServiceSpecStub},
        {
          provide: MatDialog, useClass: class {
            open = jest.fn(() => new DialogMock());
          }
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListComponent);
    component = fixture.componentInstance;
    setService = TestBed.get(MysetsService);
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  test('openDialog should open dialog and subscribe to result', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });
});
