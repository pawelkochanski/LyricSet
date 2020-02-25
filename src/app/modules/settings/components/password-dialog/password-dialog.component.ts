import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { specialSignValidator } from 'app/shared/validators/specialSignValidator';
import { passwordMatchValidator } from 'app/shared/validators/passwordMatchValidator';

export interface PasswordData {
  password: string;
  newpassword: string;
}
@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordData,
    private readonly fb: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.passwordForm.controls;
  }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(6), specialSignValidator()]],
      reppassword: ['', passwordMatchValidator('newpassword')]
    });
  }
}
