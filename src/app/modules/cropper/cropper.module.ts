import { AngularMaterialModule } from './../../shared/angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatExpansionModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

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
