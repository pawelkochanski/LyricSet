import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBandDialogComponent } from './add-to-band-dialog.component';

describe('AddToBandDialogComponent', () => {
  let component: AddToBandDialogComponent;
  let fixture: ComponentFixture<AddToBandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToBandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
