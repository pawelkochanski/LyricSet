import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-add-set-dialog',
  templateUrl: './add-set-dialog.component.html',
  styleUrls: ['./add-set-dialog.component.scss']
})
export class AddSetDialogComponent implements OnInit {
  name: string;

  ngOnInit() {
  }


  constructor(
    public dialogRef: MatDialogRef<AddSetDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
