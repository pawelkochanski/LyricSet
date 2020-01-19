import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHeaderComponent } from './set-header.component';

describe('SetHeaderComponent', () => {
  let component: SetHeaderComponent;
  let fixture: ComponentFixture<SetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
