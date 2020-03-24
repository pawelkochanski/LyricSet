import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandTracklistItemComponent } from './band-tracklist-item.component';

describe('BandTracklistItemComponent', () => {
  let component: BandTracklistItemComponent;
  let fixture: ComponentFixture<BandTracklistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandTracklistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandTracklistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
