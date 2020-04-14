import {PasswordDialogComponent} from './password-dialog.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterTestingModule} from '@angular/router/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('PasswordDialogComponent', () => {
	let component: PasswordDialogComponent;
	let fixture: ComponentFixture<PasswordDialogComponent>;
	let dialogRef: MatDialogRef<PasswordDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				RouterTestingModule,
				FormsModule,
				MatExpansionModule,
				ReactiveFormsModule
			],
			declarations: [PasswordDialogComponent],
			providers: [
				{
					provide: MatDialogRef, useValue: {
						close: jest.fn()
					}
				},
				{
					provide: MAT_DIALOG_DATA, useValue: {
						password: 'fakeId',
						newpassword: 'fakeId'
					}
				},
				FormBuilder
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordDialogComponent);
		component = fixture.componentInstance;
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
});