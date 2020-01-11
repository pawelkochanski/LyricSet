import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {AngularMaterialModule} from '../shared/angular-material.module';
import {RouterModule} from '@angular/router';
import {HomeModule} from '../modules/home/home.module';

@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    HomeModule
  ]
})
export class CoreModule { }
