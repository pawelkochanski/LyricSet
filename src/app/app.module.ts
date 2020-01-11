import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SetListModule} from './modules/set-list/set-list.module';
import {CoreModule} from './core/core.module';
import {TrackListModule} from './modules/track-list/track-list.module';
import {SongModule} from './modules/song/song.module';
import {AngularMaterialModule} from './shared/angular-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SetListModule,
    CoreModule,
    TrackListModule,
    SongModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
