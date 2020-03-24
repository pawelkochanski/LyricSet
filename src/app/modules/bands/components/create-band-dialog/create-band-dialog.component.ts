import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-band-dialog',
  templateUrl: './create-band-dialog.component.html',
  styleUrls: ['./create-band-dialog.component.scss']
})
export class CreateBandDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateBandDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly bandService: BandService,
    private readonly errorService: ErrorService,
    private readonly toastr: ToastrService) {
  }

  setNameForm: FormGroup;

  ngOnInit() {
    this.setNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
    })
    ;
  }

  get formcontrols() {
    return this.setNameForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick() {
    const value = this.setNameForm.value;
    if (value.name) {
      this.bandService.createBand(value.name).subscribe(
        () => {
          this.toastr.success('Succesfully created new band!');
        },
        error => {
          this.errorService.handleError(error);
        }
      );
    }
    this.dialogRef.close();
  }

}
