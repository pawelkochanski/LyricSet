import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {SetListComponent} from './components/set-list/set-list.component';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {SongComponent} from './components/song/song.component';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, BrowserAnimationsModule],
      declarations: [
        LibraryComponent,
        SetListComponent,
        SetListItemComponent,
        SongComponent,
        TrackListComponent,
        TrackListItemComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
