import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListItemComponent } from './track-list-item.component';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';

describe('TrackListItemComponent', () => {
  let component: TrackListItemComponent;
  let fixture: ComponentFixture<TrackListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [ TrackListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackListItemComponent);
    component = fixture.componentInstance;
    component.track = {title: 'Test', artist: 'test', img: '', lyrics: 'lyrics'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
