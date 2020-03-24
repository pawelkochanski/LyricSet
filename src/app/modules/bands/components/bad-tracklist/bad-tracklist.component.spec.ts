import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadTracklistComponent } from './bad-tracklist.component';

describe('BadTracklistComponent', () => {
  let component: BadTracklistComponent;
  let fixture: ComponentFixture<BadTracklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadTracklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
