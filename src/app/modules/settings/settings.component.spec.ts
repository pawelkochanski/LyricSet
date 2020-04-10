import {SettingsComponent} from './settings.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterTestingModule} from '@angular/router/testing';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				FormsModule,
				MatExpansionModule,
				ReactiveFormsModule
			],
			declarations: [SettingsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});
});