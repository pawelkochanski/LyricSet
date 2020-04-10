import {BandsComponent} from './bands.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {BandService} from '../../core/services/band.service';
import {BandServiceSpecStub} from '../../core/services/band.service.spec.stub';

describe('BandsComponent', () => {
	let component: BandsComponent;
	let fixture: ComponentFixture<BandsComponent>;
	let bandService: BandService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BandsComponent],
			imports: [AngularMaterialModule,
				CommonModule,
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				SharedModule,
				DragDropModule],

			providers: [
				{provide: BandService, useClass: BandServiceSpecStub},
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BandsComponent);
		component = fixture.componentInstance;
		bandService = TestBed.get(BandService);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('onDestroy should set activeBand to null', () => {
		component.ngOnDestroy();
		expect(bandService.activeBand).toBeNull();
	});

});
