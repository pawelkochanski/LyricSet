import {BandViewComponent} from './band-view.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MatDialog} from '@angular/material';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {of, throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {Band} from '../../../../shared/interfaces/Band';

@Component({
	template: ''
})
class DummyComponent {

}


describe('BandViewComponent', () => {
	let component: BandViewComponent;
	let fixture: ComponentFixture<BandViewComponent>;
	let bandService: BandService;
	let errorService: ErrorService;
	let setService: MysetsService;
	let dialog: MatDialog;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes([
						{path: 'bands', component: DummyComponent}
					]
				),
				SharedModule,
				DragDropModule],
			declarations: [
				BandViewComponent,
				DummyComponent
			],
			providers: [
				{provide: BandService, useClass: BandServiceSpecStub},
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				{
					provide: ErrorService, useValue: {
						handleError: jest.fn()
					}
				},
				{
					provide: MatDialog, useValue: {
						open: jest.fn(() => {
							return {
								afterClosed: () => of({})
							};

						}),

					}
				},
				{
					provide: ActivatedRoute, useValue: {
						params: of({
							bandid: 'fakeId'
						})
					}
				},
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BandViewComponent);
		component = fixture.componentInstance;
		bandService = TestBed.get(BandService);
		errorService = TestBed.get(ErrorService);
		setService = TestBed.get(MysetsService);
		dialog = TestBed.get(MatDialog);
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('init should call handleBandId', () => {
		const spy = jest.spyOn(component, 'handleBandId');
		component.ngOnInit();
		expect(spy).toHaveBeenCalled();
	});

	describe('HandleBandId', () => {
		test('should call getUsers if OK response', () => {
			const spy = jest.spyOn(bandService, 'getUsers');
			jest.spyOn(bandService, 'getBand').mockReturnValue(of({} as Band));
			component.handleBandId('fakeId');
			expect(spy).toHaveBeenCalled();
		});

		test('should call handleError on error', () => {
			jest.spyOn(bandService, 'getBand').mockReturnValue(throwError(new Error()));
			component.handleBandId('fakeId');
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});

	describe('onEditImage', () => {
		test('should call dialog open', () => {
			component.onEditImage();
			expect(dialog.open).toHaveBeenCalled();
		});

		test('should call uploadImageBand', () => {
			const spy = jest.spyOn(bandService, 'uploadImageBand');
			component.onEditImage();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('onRemoveImage', () => {
		test('should call removeImageBand', () => {
			const spy = jest.spyOn(bandService, 'removeImageBand');
			component.onRemoveImage();
			expect(spy).toHaveBeenCalled();
		});

		test('should call handleError on error', () => {
			jest.spyOn(bandService, 'removeImageBand').mockReturnValue(throwError(new Error()));
			component.onRemoveImage();
			expect(errorService.handleError).toHaveBeenCalled();
		});
	});

	test('onFinishEditClick should call updateBand', () => {
		const spy = jest.spyOn(bandService, 'updateBand');
		component.onFinishEditClick();
		expect(spy).toHaveBeenCalled();
	});

	test('onRemoveBandClick() should call deleteActiveBand on confirm', () => {
		window.confirm = jest.fn(() => true);
		const spy = jest.spyOn(bandService, 'deleteAvtiveBand');
		component.onRemoveBandClick();
		expect(spy).toHaveBeenCalled();
	});
	test('onLeaveBandClick() should call leaveBand', () => {
		const spy = jest.spyOn(bandService, 'leaveBand');
		component.onLeaveBandClick();
		expect(spy).toHaveBeenCalled();
	});

});