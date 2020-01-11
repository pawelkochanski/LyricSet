import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './components/song/song.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';



@NgModule({
  declarations: [SongComponent],
  exports: [
    SongComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class SongModule { }
