import {UserComponent} from './user.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {MysetsService} from '../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../core/services/mysets.service.spec.stub';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../core/services/error.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UserResponse} from '../../shared/interfaces/userResponse';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;
	let setService: MysetsService;
	let errorService: ErrorService;
	let dialog: MatDialog;
	let route: ActivatedRoute;

	const mockUserResponse = {
		id: 'fakeID',
		displayname: 'fakeName',
		bio: '',
		url: '',
		avatarId: '',
	} as UserResponse;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AngularMaterialModule, RouterTestingModule, MatRadioModule, FormsModule, RatingModule],
			declarations: [UserComponent],
			providers: [
				{
					provide: ActivatedRoute, useValue: {
						params: of({
							id: 'fakeId'
						})
					}
				},
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{
					provide: MatDialog, useValue: {
						open: jest.fn()
					}
				},
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
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		setService = TestBed.get(MysetsService);
		errorService = TestBed.get(ErrorService);
		dialog = TestBed.get(MatDialog);
		route = TestBed.get(ActivatedRoute);
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('init should call getUser if params.id', () => {
		const spy = jest.spyOn(component, 'getUser');
		component.ngOnInit();
		expect(spy).toHaveBeenCalled();
	});

	test('init should not call getUser if no params.id', () => {
		route.params = of({});
		fixture.detectChanges();
		const spy = jest.spyOn(component, 'getUser');
		component.ngOnInit();
		expect(spy).not.toHaveBeenCalled();
	});

	describe('getUser', () => {

		test('should call setSerivce.getUser', () => {
			const spy = jest.spyOn(setService, 'getUser');
			component.getUser('fakeId');
			expect(spy).toHaveBeenCalled();
		});

		test('should set user on ok response', () => {
			jest.spyOn(setService, 'getUser').mockReturnValue(of(mockUserResponse));
			component.getUser('fakeId');
			expect(component.user).toEqual(mockUserResponse);
		});

		test('should set user on ok response', () => {
			jest.spyOn(setService, 'getUser').mockReturnValue(throwError(new Error()));
			component.getUser('fakeID');
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});

	test('onInviteCLick should call dialog open', () => {
		component.onInviteClick();
		expect(dialog.open).toHaveBeenCalled();
	});
});