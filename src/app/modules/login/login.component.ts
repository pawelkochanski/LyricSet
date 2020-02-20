import { Router } from '@angular/router';
import { AuthService } from 'app/core/authentication/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
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

    this.authService.login(this.loginForm.value)
      .subscribe(response => {},
      error => {
        this.handleErrors(error);
      });
  }

  private handleErrors(error: string) {
    switch (error) {
      case 'BAD_CREDENTIALS':
        this.loginForm.reset();
        this.loginForm.setErrors({badCredentials : true});
        break;
      case 'SERVER_ERROR':
        this.router.navigate(['server-error']);
    }

  }
}
