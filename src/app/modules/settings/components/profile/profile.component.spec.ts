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
import {ProfileComponent} from './profile.component';
import {SettingsService} from '../../../../core/services/settings.service';
import {Settings} from '../../../../shared/interfaces/settings';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {ImagesData} from '../../../../shared/interfaces/imageData';

describe('Profile', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;
	let dialog: MatDialog;
	let errorService: ErrorService;
	let toastr: ToastrService;
	let authService: AuthService;
	let settingsService: SettingsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				FormsModule,
				MatExpansionModule,
				ReactiveFormsModule
			],
			declarations: [ProfileComponent],
			providers: [
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{
					provide: MatDialog, useValue: {
						open: jest.fn(() => {
							return {
								afterClosed: () => of({imageId: '13'})
							};

						}),

					}
				},
				{
					provide: SettingsService, useValue: {
						updateProfile: jest.fn(() => of({} as Settings)),
						updateAvatar: jest.fn(() => of({} as ImagesData)),
						removeAvatar: jest.fn(() => of({}))
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
		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		errorService = TestBed.get(ErrorService);
		authService = TestBed.get(AuthService);
		toastr = TestBed.get(ToastrService);
		dialog = TestBed.get(MatDialog);
		settingsService = TestBed.get(SettingsService);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('open dialog should call updateAvatar', () => {
		component.openDialog();
		expect(settingsService.updateAvatar).toHaveBeenCalled();
	});


});
