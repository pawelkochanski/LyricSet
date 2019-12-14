import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SetListModule} from './modules/set-list/set-list.module';
import {MatCardModule, MatSidenavModule, MatTabsModule} from '@angular/material';
import {CoreModule} from './core/core.module';
import {TrackListModule} from './modules/track-list/track-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SetListModule,
    MatCardModule,
    CoreModule,
    MatSidenavModule,
    MatTabsModule,
    TrackListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
