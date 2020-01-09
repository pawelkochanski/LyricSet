import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [TrackListComponent, TrackListItemComponent],
  exports: [
    TrackListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ]
})
export class TrackListModule {
}
