import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackListComponent} from './track-list.component';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {TrackListItemComponent} from '../track-list-item/track-list-item.component';

describe('TrackListComponent', () => {
  let component: TrackListComponent;
  let fixture: ComponentFixture<TrackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [TrackListComponent, TrackListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
