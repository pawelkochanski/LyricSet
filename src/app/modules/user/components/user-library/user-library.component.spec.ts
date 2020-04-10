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
import {LyricSet} from '../../../../shared/interfaces/lyric-set';
import {of, throwError} from 'rxjs';

describe('UserLibraryComponent', () => {
	let component: UserLibraryComponent;
	let fixture: ComponentFixture<UserLibraryComponent>;
	let setService: MysetsService;
	let errorService: ErrorService;
	const mockSet = {
		id: '13',
		name: 'Mockset',
		description: '',
		tracklist: [],
		imageId: ''
	} as LyricSet;

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
		setService = TestBed.get(MysetsService);
		errorService = TestBed.get(ErrorService);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	describe('init', () => {
		test('should call setService.getSetList', () => {
			const spy = jest.spyOn(setService, 'getSetList');
			component.ngOnInit();
			expect(spy).toHaveBeenCalled();
		});

		test('should call setMySetlist on OK response', () => {
			jest.spyOn(setService, 'getSetList').mockReturnValue(
				of([mockSet])
			);
			const spy = jest.spyOn(setService, 'setMySetList');
			component.ngOnInit();
			expect(spy).toHaveBeenCalled();
		});
		test('should  call handleError on Error response', () => {
			jest.spyOn(setService, 'getSetList').mockReturnValue(
				throwError(new Error())
			);
			component.ngOnInit();
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});
});