import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from '../modules/library/library.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../modules/home/home.component';
import {SetListComponent} from '../modules/library/components/set-list/set-list.component';
import {TrackListComponent} from '../modules/library/components/track-list/track-list.component';
import {SongComponent} from '../modules/library/components/song/song.component';

const appRoutes: Routes = [
  {path: 'library', component: LibraryComponent, children: [
      {path: ':set', component: TrackListComponent},
      {path: ':set/:song', component: SongComponent}
    ]},
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
