import {Component, Inject, OnInit} from '@angular/core';
import {Band} from '../../../../shared/interfaces/Band';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BandService} from '../../../../core/services/band.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from '../../../../core/services/error.service';


export interface AddToBandData {
	userid: string;
}

@Component({
	selector: 'app-add-to-band-dialog',
	templateUrl: './add-to-band-dialog.component.html',
	styleUrls: ['./add-to-band-dialog.component.scss']
})
export class AddToBandDialogComponent implements OnInit {

	selectedBand: Band;

	constructor(private readonly bandService: BandService,
	            private readonly setService: MysetsService,
	            public dialogRef: MatDialogRef<AddToBandDialogComponent>,
	            private readonly toastr: ToastrService,
	            private readonly errorService: ErrorService,
	            @Inject(MAT_DIALOG_DATA) public data: AddToBandData) {
	}

	onNoClick() {
		this.dialogRef.close();
	}

	onSendClick() {
		if (!this.selectedBand) {
			return;
		}
		this.bandService.addUserToBand(this.selectedBand.id, this.data.userid).subscribe(
			() => {
				this.toastr.success('User added to band!');
				this.dialogRef.close();
			}, error1 => {
				this.errorService.handleError(error1);
			}
		);
	}

	ngOnInit() {
		this.bandService.refreshBandlist();
	}

}
