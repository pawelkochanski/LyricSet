import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CropperComponent} from './components/cropper/cropper.component';
import {SongComponent} from './components/song/song.component';
import {AddSongDialogComponent} from './components/add-song-dialog/add-song-dialog.component';
import {AngularMaterialModule} from './angular-material.module';
import {MatDialogModule, MatExpansionModule} from '@angular/material';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CropperComponent, SongComponent, AddSongDialogComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    ImageCropperModule,
    MatDialogModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {
}
