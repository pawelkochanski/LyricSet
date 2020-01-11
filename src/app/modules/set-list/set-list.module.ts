import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetListComponent} from './components/set-list/set-list.component';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {AngularMaterialModule} from '../../shared/angular-material.module';

@NgModule({
  declarations: [SetListComponent, SetListItemComponent],
  exports: [
    SetListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    AngularMaterialModule,
  ],
})
export class SetListModule {
}
