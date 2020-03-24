import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BandsComponent} from './bands.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateBandDialogComponent} from './components/create-band-dialog/create-band-dialog.component';
import {BandViewComponent} from './components/band-view/band-view.component';
import {BandListComponent} from './components/band-list/band-list.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { BadTracklistComponent } from './components/bad-tracklist/bad-tracklist.component';
import { BandTracklistItemComponent } from './components/band-tracklist-item/band-tracklist-item.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MembersListComponent } from './components/members-list/members-list.component';


@NgModule({
  declarations: [
    BandsComponent,
    CreateBandDialogComponent,
    BandViewComponent,
    BandListComponent,
    BadTracklistComponent,
    BandTracklistItemComponent,
    MembersListComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    DragDropModule
  ]
})
export class BandsModule {
}
