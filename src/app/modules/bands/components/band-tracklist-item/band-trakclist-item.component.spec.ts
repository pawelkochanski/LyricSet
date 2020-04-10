import {BandTracklistItemComponent} from './band-tracklist-item.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BandService} from '../../../../core/services/band.service';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('BandTracklistItemComponent', () => {
	let component: BandTracklistItemComponent;
	let fixture: ComponentFixture<BandTracklistItemComponent>;
	let bandService: BandService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				DragDropModule],
			declarations: [BandTracklistItemComponent],
			providers: [
				{provide: BandService, useClass: BandServiceSpecStub}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BandTracklistItemComponent);
		component = fixture.componentInstance;
		bandService = TestBed.get(BandService);

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('onRemoveClick should call bandService removeTrack', () => {
		const spy = jest.spyOn(bandService, 'removeTrack');
		component.OnRemoveClick();
		expect(spy).toHaveBeenCalled();
	});
});