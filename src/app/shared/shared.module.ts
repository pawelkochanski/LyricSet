import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CropperComponent} from './components/cropper/cropper.component';
import {SongComponent} from './components/song/song.component';
import {AddSongDialogComponent} from './components/add-song-dialog/add-song-dialog.component';
import {AngularMaterialModule} from './angular-material.module';
import {MatDialogModule, MatExpansionModule, MatRadioModule} from '@angular/material';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackListItemComponent} from './components/track-list-item/track-list-item.component';
import {SetHeaderComponent} from './components/set-header/set-header.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RatingModule} from 'ng-starrating';


@NgModule({
	declarations: [CropperComponent, SongComponent, AddSongDialogComponent, TrackListComponent,
		TrackListItemComponent, SetHeaderComponent],
	exports: [
		TrackListComponent,
		TrackListItemComponent,
	],
	imports: [
		CommonModule,
		MatExpansionModule,
		ImageCropperModule,
		MatDialogModule,
		AngularMaterialModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MatRadioModule,
		DragDropModule,
		RatingModule
	]
})
export class SharedModule {
}
