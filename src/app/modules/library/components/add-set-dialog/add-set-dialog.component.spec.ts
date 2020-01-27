import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetDialogComponent } from './add-set-dialog.component';

describe('AddSetDialogComponent', () => {
  let component: AddSetDialogComponent;
  let fixture: ComponentFixture<AddSetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
