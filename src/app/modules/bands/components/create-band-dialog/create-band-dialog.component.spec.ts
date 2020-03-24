import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBandDialogComponent } from './create-band-dialog.component';

describe('CreateBandDialogComponent', () => {
  let component: CreateBandDialogComponent;
  let fixture: ComponentFixture<CreateBandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
