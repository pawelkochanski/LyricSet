import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from '../modules/library/library.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../modules/home/home.component';

const appRoutes: Routes = [
  {path: 'library', component: LibraryComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
