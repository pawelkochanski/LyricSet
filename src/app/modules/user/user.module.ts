import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import {RouterModule} from '@angular/router';
import { AddToBandDialogComponent } from './components/add-to-band-dialog/add-to-band-dialog.component';
import {MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [UserComponent, UserLibraryComponent, AddToBandDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    MatRadioModule,
    FormsModule
  ]
})
export class UserModule { }
