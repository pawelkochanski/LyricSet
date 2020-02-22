import { ToastrService } from 'ngx-toastr';
import { Errors } from './../../shared/enums/errors';
import { ErrorService } from './../../core/services/error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/authentication/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private errorService: ErrorService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: [''],
        password: ['']
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(response => {
        this.router.navigate(['library']);
      },
      error => {
        const message = this.errorService.handleError(error);
        this.handleErrors(message);
      });
  }

  private handleErrors(message: Errors) {
    console.log(message);
    switch (message) {
      case Errors.INVALID_CREDENTIALS:
      case Errors.PASSWORD_REQUIRED:
      case Errors.USERNAME_REQUIRED:
        this.loginForm.reset();
        this.loginForm.setErrors({badCredentials : true});
    }
    this.isLoading = false;
  }
}
