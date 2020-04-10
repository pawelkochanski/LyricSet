import {MembersListComponent} from './members-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {BandService} from '../../../../core/services/band.service';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MembersListComponent', () => {
	let component: MembersListComponent;
	let fixture: ComponentFixture<MembersListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				SharedModule,
				DragDropModule
			],
			declarations: [MembersListComponent],
			providers: [
				{provide: BandService, useClass: BandServiceSpecStub},
				{provide: MysetsService, useClass: MysetsServiceSpecStub}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MembersListComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});
});