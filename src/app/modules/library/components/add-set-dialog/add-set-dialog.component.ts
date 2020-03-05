import { MysetsService } from 'app/core/services/mysets.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-set-dialog',
  templateUrl: './add-set-dialog.component.html',
  styleUrls: ['./add-set-dialog.component.scss']
})
export class AddSetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSetDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly setService: MysetsService) {}

  setNameForm: FormGroup;

  ngOnInit() {
    this.setNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  get f() {
    return this.setNameForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick() {
    const name = this.f.name.value;
    console.log(name);
    if (name) {
      this.setService.addSet(name).subscribe(
        response => {}
      );
    }
    this.dialogRef.close();
  }
}
