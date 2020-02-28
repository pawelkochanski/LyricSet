import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {SetListComponent} from './components/set-list/set-list.component';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {SongComponent} from './components/song/song.component';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {LibraryComponent} from './library.component';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SetHeaderComponent } from './components/set-header/set-header.component';
import {FormsModule} from '@angular/forms';
import { AddSetDialogComponent } from './components/add-set-dialog/add-set-dialog.component';
import { MysetsService } from 'app/core/services/mysets.service';


@NgModule({
  declarations: [
    LibraryComponent,
    SetListComponent,
    SetListItemComponent,
    SongComponent,
    TrackListComponent,
    TrackListItemComponent,
    SetHeaderComponent,
    AddSetDialogComponent],
  exports: [
    LibraryComponent
  ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        DragDropModule,
        FormsModule,
    ],
    providers: [MysetsService]
})
export class LibraryModule {
}
