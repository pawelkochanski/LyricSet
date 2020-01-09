import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetListComponent} from './components/set-list/set-list.component';
import {MatListModule, MatTabsModule} from '@angular/material';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [SetListComponent, SetListItemComponent],
  exports: [
    SetListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
  ],
})
export class SetListModule {
}
