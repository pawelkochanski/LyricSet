import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material';
import {MaterialFileInputModule} from 'ngx-material-file-input';



@NgModule({
  declarations: [SettingsComponent, ProfileComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    MatExpansionModule,
    MaterialFileInputModule
  ]
})
export class SettingsModule { }
