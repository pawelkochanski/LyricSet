import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class HomeModule { }
