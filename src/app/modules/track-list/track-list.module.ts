import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';


@NgModule({
  declarations: [TrackListComponent, TrackListItemComponent],
  exports: [
    TrackListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class TrackListModule {
}
