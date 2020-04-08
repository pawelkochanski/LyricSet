import {UserLibraryComponent} from './user-library.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {RouterTestingModule} from '@angular/router/testing';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {ErrorService} from '../../../../core/services/error.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('UserLibraryComponent', () => {
	let component: UserLibraryComponent;
	let fixture: ComponentFixture<UserLibraryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				FormsModule,
				RatingModule
			],
			declarations: [UserLibraryComponent],
			providers: [
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{
					provide: ErrorService, useValue: {
						handleError: jest.fn()
					}
				}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserLibraryComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});
});