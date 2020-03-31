import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularComponent } from './popular.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RatingModule} from 'ng-starrating';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PopularComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RatingModule,
    RouterModule
  ]
})
export class PopularModule { }
