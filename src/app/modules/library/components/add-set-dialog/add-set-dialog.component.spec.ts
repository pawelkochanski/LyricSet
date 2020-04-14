import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../../../core/services/mysets.service.spec.stub';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AddSetDialogComponent} from './add-set-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';


describe('AddSetDialogComponent', () => {

	let component: AddSetDialogComponent;
	let fixture: ComponentFixture<AddSetDialogComponent>;
	let setService: MysetsService;
	let router: Router;
	let dialogRef: MatDialogRef<AddSetDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AngularMaterialModule, ReactiveFormsModule],
			providers: [
				{
					provide: MatDialogRef, useClass: class {
						close = jest.fn();
					}
				},
				{provide: MysetsService, useClass: MysetsServiceSpecStub},
				FormBuilder,
				{
					provide: Router, useClass: class {
						navigate = jest.fn();
					}
				}
			],
			declarations: [AddSetDialogComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddSetDialogComponent);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		setService = TestBed.get(MysetsService);
		dialogRef = TestBed.get(MatDialogRef);
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('onNoClick should call close', () => {
		component.onNoClick();
		expect(dialogRef.close).toHaveBeenCalled();
	});

	test('onSendCLick should call addSet if name defined', () => {
		component.formcontrols.name.setValue('nazwa');
		component.formcontrols.isPrivate.setValue('true');
		const spy = jest.spyOn(setService, 'addSet');
		component.onSendClick();
		expect(spy).toHaveBeenCalled();
	});

	test('onSendCLick should  not call addSet if name undefined', () => {
		const spy = jest.spyOn(setService, 'addSet');
		component.onSendClick();
		expect(dialogRef.close).toHaveBeenCalled();
		expect(spy).not.toHaveBeenCalled();
	});
});
