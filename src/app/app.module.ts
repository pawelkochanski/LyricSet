import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AngularMaterialModule} from './shared/angular-material.module';
import {LibraryModule} from './modules/library/library.module';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RegisterModule} from './modules/register/register.module';
import {LoginModule} from './modules/login/login.module';
import {SettingsModule} from './modules/settings/settings.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularMaterialModule,
    LibraryModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RegisterModule,
    LoginModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
