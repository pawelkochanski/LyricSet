import { ErrorService } from './../../core/services/error.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {specialSignValidator} from '../../shared/validators/specialSignValidator';
import {passwordMatchValidator} from '../../shared/validators/passwordMatchValidator';
import { AuthService } from 'app/core/authentication/auth.service';
import {map} from 'rxjs/operators';
import { Errors } from 'app/shared/enums/errors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly router: Router,
              private http: HttpClient,
              private authService: AuthService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), specialSignValidator()]],
      repPassword: ['', passwordMatchValidator('password')]
    });
  }



  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }
    const userData: {username, email, password} = this.registerForm.value;
    this.authService.register(userData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error => {
        const message = this.errorService.handleError(error);
        switch (message) {
          case Errors.USERNAME_EXISTS:
            this.f.username.setErrors({notUnique: true});
            return;
          case Errors.EMAIL_EXISTS:
            this.f.email.setErrors({notUnique: true});
        }
      });
  }

}
