import {AddToBandDialogComponent} from './add-to-band-dialog.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {MatRadioModule} from '@angular/material/radio';
import {RouterTestingModule} from '@angular/router/testing';
import {BandService} from '../../../../core/services/band.service';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from '../../../../core/services/error.service';
import {Band} from '../../../../shared/interfaces/Band';
import {throwError} from 'rxjs';

describe('AddToBandDialogComponent', () => {
	let component: AddToBandDialogComponent;
	let fixture: ComponentFixture<AddToBandDialogComponent>;
	let dialogRef: MatDialogRef<AddToBandDialogComponent>;
	let bandService: BandService;
	let errorService: ErrorService;

	const mockBand = {
		id: 'fakeId'
	} as Band;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				MatRadioModule,
				FormsModule,
				RatingModule
			],
			declarations: [AddToBandDialogComponent],
			providers: [
				{provide: BandService, useClass: BandServiceSpecStub},
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{
					provide: MatDialogRef, useValue: {
						close: jest.fn()
					}
				},
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
				},
				{
					provide: MAT_DIALOG_DATA, useValue: {
						userid: 'fakeId'
					}
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddToBandDialogComponent);
		component = fixture.componentInstance;
		bandService = TestBed.get(BandService);
		dialogRef = TestBed.get(MatDialogRef);
		errorService = TestBed.get(ErrorService);
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('onNoClick should call dialogref.close', () => {
		component.onNoClick();
		expect(dialogRef.close).toHaveBeenCalled();
	});

	describe('onSendClick', () => {
		test('should not call bandService.addUserToBand if not selectedBand', () => {
			const spy = jest.spyOn(bandService, 'addUserToBand');
			component.onSendClick();
			expect(spy).not.toHaveBeenCalled();
		});

		test('should  call bandService.addUserToBand if selectedBand', () => {
			component.selectedBand = mockBand;
			const spy = jest.spyOn(bandService, 'addUserToBand');
			component.onSendClick();
			expect(spy).toHaveBeenCalled();
		});

		test('should  call dialogref.close if ok response', () => {
			component.selectedBand = mockBand;
			component.onSendClick();
			expect(dialogRef.close).toHaveBeenCalled();
		});

		test('should call errorService.handleError if error response', () => {
			component.selectedBand = mockBand;
			jest.spyOn(bandService, 'addUserToBand').mockReturnValue(throwError(new Error()));
			component.onSendClick();
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});
});