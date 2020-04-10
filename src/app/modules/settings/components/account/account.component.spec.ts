import {AccountComponent} from './account.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '../../../../core/services/error.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../../core/authentication/auth.service';
import {AuthServiceSpecStub} from '../../../../core/authentication/auth.service.spec.stub';
import {of} from 'rxjs';

describe('AccountComponent', () => {
	let component: AccountComponent;
	let fixture: ComponentFixture<AccountComponent>;
	let dialog: MatDialog;
	let errorService: ErrorService;
	let toastr: ToastrService;
	let authService: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				FormsModule,
				MatExpansionModule,
				ReactiveFormsModule
			],
			declarations: [AccountComponent],
			providers: [
				{
					provide: MatDialog, useValue: {
						open: jest.fn(() => {
							return {
								afterClosed: () => of({password: '123'})
							};

						}),

					}
				},
				{provide: AuthService, useClass: AuthServiceSpecStub},
				{
					provide: ToastrService, useValue: {
						success: jest.fn(),
						error: jest.fn()
					}
				},
				{
					provide: ErrorService, useValue: {
						handleError: jest.fn()
					}
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountComponent);
		component = fixture.componentInstance;
		errorService = TestBed.get(ErrorService);
		authService = TestBed.get(AuthService);
		toastr = TestBed.get(ToastrService);
		dialog = TestBed.get(MatDialog);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	describe('openPasswordDialog', () => {
		test('should call dialog.open', () => {
			component.openPasswordDialog();
			expect(dialog.open).toHaveBeenCalled();
		});
		test('should call authService.changePassword on succes', () => {
			const spy = jest.spyOn(authService, 'changePassword').mockReturnValue(of({}));
			component.openPasswordDialog();
			expect(spy).toHaveBeenCalled();
			expect(toastr.success).toHaveBeenCalled();
		});
	});

	test('openUsernameDialog should call dialog.open', () => {
		component.openUsernameDialog();
		expect(dialog.open).toHaveBeenCalled();
	});


});