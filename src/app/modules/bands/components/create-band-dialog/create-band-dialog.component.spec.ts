import {CreateBandDialogComponent} from './create-band-dialog.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of, throwError} from 'rxjs';
import {Band} from '../../../../shared/interfaces/Band';

describe('CreateBandDialogComponent', () => {
	let component: CreateBandDialogComponent;
	let fixture: ComponentFixture<CreateBandDialogComponent>;
	let dialogRef: MatDialogRef<CreateBandDialogComponent>;
	let bandService: BandService;
	let errorService: ErrorService;
	let toastr: ToastrService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterModule,
				SharedModule,
				DragDropModule],
			declarations: [
				CreateBandDialogComponent
			],
			providers: [
				{
					provide: MatDialogRef, useValue: {
						close: jest.fn()
					}
				},
				{
					provide: ErrorService, useValue: {
						handleError: jest.fn()
					}
				},
				{
					provide: BandService, useClass: BandServiceSpecStub
				},
				{
					provide: ToastrService, useClass: class {
						success = jest.fn();
						error = jest.fn();
					}
				},
				FormBuilder
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateBandDialogComponent);
		component = fixture.componentInstance;
		bandService = TestBed.get(BandService);
		errorService = TestBed.get(ErrorService);
		toastr = TestBed.get(ToastrService);
		dialogRef = TestBed.get(MatDialogRef);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('onNoClick should call dialogRef.close', () => {
		component.onNoClick();
		expect(dialogRef.close).toHaveBeenCalled();
	});

	describe('onSendClick', () => {

		test('should call create band if name is set', () => {
			const spy = jest.spyOn(bandService, 'createBand');
			component.setNameForm.controls.name.setValue('siema');
			component.onSendClick();
			expect(spy).toHaveBeenCalled();
		});
		test('should call toastr.succes on ok response', () => {
			jest.spyOn(bandService, 'createBand').mockReturnValue(of({} as Band));
			component.setNameForm.controls.name.setValue('siema');
			component.onSendClick();
			expect(toastr.success).toHaveBeenCalled();
		});
		test('should call errorService.handleError on error response', () => {
			jest.spyOn(bandService, 'createBand').mockReturnValue(throwError(new Error()));
			component.setNameForm.controls.name.setValue('siema');
			component.onSendClick();
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});
});