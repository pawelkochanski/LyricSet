import {BandListComponent} from './band-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {MatDialog} from '@angular/material';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {AuthServiceSpecStub} from '../../../../core/authentication/auth.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {User} from '../../../../shared/interfaces/user';
import {of} from 'rxjs';

describe('BandListComponent', () => {
	let component: BandListComponent;
	let fixture: ComponentFixture<BandListComponent>;
	let bandService: BandService;
	let errorService: ErrorService;
	let setService: MysetsService;
	let authService: AuthService;
	let dialog: MatDialog;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				DragDropModule
			],
			declarations: [BandListComponent],
			providers: [
				{provide: BandService, useClass: BandServiceSpecStub},
				{
					provide: ErrorService, useValue: {
						handleError: jest.fn()
					}
				},
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{provide: AuthService, useClass: AuthServiceSpecStub},
				{
					provide: MatDialog, useValue: {
						open: jest.fn(() => {
							return {
								afterClosed: () => of({})
							};

						}),

					}
				}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BandListComponent);
		component = fixture.componentInstance;
		setService = TestBed.get(MysetsService);
		errorService = TestBed.get(ErrorService);
		dialog = TestBed.get(MatDialog);
		authService = TestBed.get(AuthService);
		bandService = TestBed.get(BandService);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	describe('init', () => {
		test('should call refreshBandlist', () => {
			const spy = jest.spyOn(bandService, 'refreshBandlist');
			component.ngOnInit();
			expect(spy).toHaveBeenCalled();
		});

		test('should set user on user response', () => {
			component.ngOnInit();
			authService.user.next({id: 'fakeid'} as User);
			expect(component.user).toEqual({id: 'fakeid'} as User);
		});
	});

	test('openDialog should call dialog.open', () => {
		component.openDialog();
		expect(dialog.open).toHaveBeenCalled();
	});
});