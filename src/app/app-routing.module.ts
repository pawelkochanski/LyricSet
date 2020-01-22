import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from './modules/library/library.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {TrackListComponent} from './modules/library/components/track-list/track-list.component';
import {SongComponent} from './modules/library/components/song/song.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';

const appRoutes: Routes = [
  {path: 'library', component: LibraryComponent, children: [
      {path: ':setindex', component: TrackListComponent},
      {path: ':setindex/:songindex', component: SongComponent}
    ]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
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
