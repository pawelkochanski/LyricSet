import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';



@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CoreModule { }
