import {AuthGuard} from './core/guards/auth.guard';
import {ServerErrorComponent} from './modules/server-error/server-error.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from './modules/library/library.component';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {TrackListComponent} from './shared/components/track-list/track-list.component';
import {SongComponent} from './shared/components/song/song.component';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {ProfileComponent} from './modules/settings/components/profile/profile.component';
import {AccountComponent} from './modules/settings/components/account/account.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';
import {SearchComponent} from './modules/search/search.component';
import {UserComponent} from './modules/user/user.component';
import {BandsComponent} from './modules/bands/bands.component';
import {BandListComponent} from './modules/bands/components/band-list/band-list.component';
import {BandViewComponent} from './modules/bands/components/band-view/band-view.component';
import {BadTracklistComponent} from './modules/bands/components/bad-tracklist/bad-tracklist.component';
import {PopularComponent} from './modules/popular/popular.component';

const appRoutes: Routes = [
  {
    path: 'library', canActivate: [AuthGuard],
    component: LibraryComponent,
    data: {state: 'library'},
    children: [
      {path: ':setid', component: TrackListComponent},
      {path: ':setid/:songid', component: SongComponent}
    ]
  },
  {path: 'popular', data: {state: 'popular'}, component: PopularComponent},
  {
    path: 'bands',
    canActivate: [AuthGuard],
    component: BandsComponent,
    data: {state: 'bands'},
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: BandListComponent},
      {
        path: ':bandid',
        component: BandViewComponent,
        data: {state: ':bandid'},
        children: [
          {path: '', redirectTo: 'tracklist', pathMatch: 'full'},
          {path: 'tracklist', component: BadTracklistComponent},
          {path: 'tracklist/:songid', component: SongComponent}
        ]
      }
    ]
  },
  {path: 'song/:songid', component: SongComponent},
  {
    path: 'home',
    component: HomeComponent,
    data: {state: 'home'}
  },
  {path: '', redirectTo: '/home', pathMatch: 'full', data: {state: 'page'}},
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'register', component: RegisterComponent, data: {state: 'register'}},
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent,
    data: {state: 'settings'},
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'account', component: AccountComponent}
    ]
  },
  {path: 'search/:query', data: {state: 'search'}, component: SearchComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {
    path: 'user/:id', data: {state: 'user'}, component: UserComponent, children: [
      {path: ':setid', component: TrackListComponent},
      {path: ':setid/:songid', component: SongComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
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
