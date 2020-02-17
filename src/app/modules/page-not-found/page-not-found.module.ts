import { AngularMaterialModule } from './../../shared/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
