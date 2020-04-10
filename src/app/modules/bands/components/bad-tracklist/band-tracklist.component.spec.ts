import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {BandService} from '../../../../core/services/band.service';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BadTracklistComponent} from './bad-tracklist.component';

describe('BandTracklistComponent', () => {
	let component: BadTracklistComponent;
	let fixture: ComponentFixture<BadTracklistComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				DragDropModule
			],
			declarations: [BadTracklistComponent],
			providers: [{
				provide: BandService, useClass: BandServiceSpecStub
			}],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BadTracklistComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

});