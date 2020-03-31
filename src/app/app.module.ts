
import { ServerErrorModule } from './modules/server-error/server-error.module';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { LibraryModule } from './modules/library/library.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './modules/register/register.module';
import { LoginModule } from './modules/login/login.module';
import { SettingsModule } from './modules/settings/settings.module';
import { PasswordDialogComponent } from './modules/settings/components/password-dialog/password-dialog.component';
import { AddSetDialogComponent } from './modules/library/components/add-set-dialog/add-set-dialog.component';
import { PageNotFoundModule } from './modules/page-not-found/page-not-found.module';
import { ToastrModule } from 'ngx-toastr';
import { CropperComponent } from './shared/components/cropper/cropper.component';
import { UsernameDialogComponent } from './modules/settings/components/username-dialog/username-dialog.component';
import {SharedModule} from './shared/shared.module';
import {AddSongDialogComponent} from './shared/components/add-song-dialog/add-song-dialog.component';
import {SearchModule} from './modules/search/search.module';
import {UserModule} from './modules/user/user.module';
import {BandsModule} from './modules/bands/bands.module';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {CreateBandDialogComponent} from './modules/bands/components/create-band-dialog/create-band-dialog.component';
import {AddToBandDialogComponent} from './modules/user/components/add-to-band-dialog/add-to-band-dialog.component';
import {PopularModule} from './modules/popular/popular.module';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

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
    SettingsModule,
    PageNotFoundModule,
    HttpClientModule,
    ServerErrorModule,
    ToastrModule.forRoot(),
    SharedModule,
    SearchModule,
    UserModule,
    BandsModule,
    SocketIoModule.forRoot(config),
    PopularModule

  ],
  entryComponents: [
    PasswordDialogComponent,
    AddSetDialogComponent,
    CropperComponent,
    UsernameDialogComponent,
    AddSongDialogComponent,
    CreateBandDialogComponent,
    AddToBandDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function baseUrl(): string {
  return window.location.origin;
}
