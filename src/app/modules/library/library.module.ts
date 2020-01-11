import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {SetListComponent} from './components/set-list/set-list.component';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {SongComponent} from './components/song/song.component';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {LibraryComponent} from './library.component';


@NgModule({
  declarations: [
    LibraryComponent,
    SetListComponent,
    SetListItemComponent,
    SongComponent,
    TrackListComponent,
    TrackListItemComponent],
  exports: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class LibraryModule {
}
