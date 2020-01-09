import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './components/song/song.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [SongComponent],
  exports: [
    SongComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class SongModule { }
