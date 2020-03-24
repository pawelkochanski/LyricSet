import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {SetListComponent} from './components/set-list/set-list.component';
import {SetListItemComponent} from './components/set-list-item/set-list-item.component';
import {LibraryComponent} from './library.component';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSetDialogComponent } from './components/add-set-dialog/add-set-dialog.component';
import { MysetsService } from 'app/core/services/mysets.service';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    LibraryComponent,
    SetListComponent,
    SetListItemComponent,
    AddSetDialogComponent],
  exports: [
    LibraryComponent
  ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        DragDropModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [MysetsService]
})
export class LibraryModule {
}
