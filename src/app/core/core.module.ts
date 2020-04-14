import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {AngularMaterialModule} from '../shared/angular-material.module';
import {RouterModule} from '@angular/router';
import {HomeModule} from '../modules/home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
	declarations: [NavbarComponent, SearchBarComponent],
	exports: [
		NavbarComponent
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		AngularMaterialModule,
		RouterModule,
		HomeModule,
		FormsModule,
		ClickOutsideModule
	]
})
export class CoreModule {
}
