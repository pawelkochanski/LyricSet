import {MysetsService} from 'app/core/services/mysets.service';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
	selector: 'app-add-set-dialog',
	templateUrl: './add-set-dialog.component.html',
	styleUrls: ['./add-set-dialog.component.scss']
})
export class AddSetDialogComponent implements OnInit {

	setNameForm: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<AddSetDialogComponent>,
		private readonly fb: FormBuilder,
		private readonly setService: MysetsService,
		private readonly router: Router) {
	}

	get formcontrols() {
		return this.setNameForm.controls;
	}

	ngOnInit() {
		this.setNameForm = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(15)]],
			isPrivate: ['', []]
		})
		;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSendClick() {
		const name = this.formcontrols.name.value;
		const value = this.setNameForm.value;
		if (name) {
			this.setService.addSet(value).subscribe(
				() => {
					this.setService.refreshLibrary();
					this.dialogRef.close();
				}
			);
		} else {
			this.dialogRef.close();
		}

	}
}
