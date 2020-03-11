import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatCardModule,
  MatSidenavModule,
  MatTabsModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule, MatAutocompleteModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class AngularMaterialModule {
}
