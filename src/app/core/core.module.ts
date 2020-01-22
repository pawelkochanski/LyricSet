import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {AngularMaterialModule} from '../shared/angular-material.module';
import {RouterModule} from '@angular/router';
import {HomeModule} from '../modules/home/home.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [NavbarComponent, LoginComponent, RegisterComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    HomeModule
  ]
})
export class CoreModule { }
