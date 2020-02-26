import { ErrorService } from './../../../../core/services/error.service';
import { AuthService } from 'app/core/authentication/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Errors } from 'app/shared/enums/errors';
import { ToastrService } from 'ngx-toastr';

export interface usernameData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.scss']
})
export class UsernameDialogComponent implements OnInit {
  isLoading = false;
  usernameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsernameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: usernameData,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly errorService: ErrorService,
    private readonly toastr: ToastrService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick() {
    this.isLoading = true;
    if (this.usernameForm.valid) {
      this.authService.changeUsername({
        username: this.f.username.value,
        password: this.f.password.value}
        ).subscribe(resp => {
          this.dialogRef.close();
          this.toastr.success('Your username has been changed!');
        }, err => {
          const message = this.errorService.handleError(err);
          this.handleErrors(message);
        });
    }

  }

  private handleErrors(message: Errors) {
    console.log(Errors[message]);
    switch (message) {
      case Errors.INVALID_CREDENTIALS:
        this.f.password.reset();
        this.f.password.setErrors({badCredentials : true});
    }
    this.isLoading = false;
  }

  get f() {
    return this.usernameForm.controls;
  }

  ngOnInit() {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }

}
