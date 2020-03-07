import { AngularMaterialModule } from '../../angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    MatDialogModule,
    AngularMaterialModule,
    MatExpansionModule
  ],
  declarations: [CropperComponent]
})
export class CropperModule { }
