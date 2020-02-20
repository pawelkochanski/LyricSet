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
  isLoading = false;

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
    this.isLoading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(response => {
        this.router.navigate(['library']);
      },
      error => {
        this.handleErrors(error);
      });
  }

  private handleErrors(error: string) {
    console.log(error);
    switch (error) {
      case 'BAD_CREDENTIALS':
        this.loginForm.reset();
        this.loginForm.setErrors({badCredentials : true});
        break;
      case 'SERVER_ERROR':
        // this.router.navigate(['server-error']);
    }
    this.isLoading = false;
  }
}
