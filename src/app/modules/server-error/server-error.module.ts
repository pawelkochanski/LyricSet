import { AngularMaterialModule } from './../../shared/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorComponent } from './server-error.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [ServerErrorComponent]
})
export class ServerErrorModule { }
