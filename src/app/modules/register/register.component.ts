import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {specialSignValidator} from './specialSignValidator';
import {passwordMatchValidator} from './passwordMatchValidator';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private readonly router: Router,
              private http: HttpClient,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), specialSignValidator()]],
      repPassword: ['', passwordMatchValidator('password')]
    });

  }

  onUsernameInput() {
    if (this.f.username.valid && this.f.username.dirty) {
      this.authService.checkUsername(this.f.username.value)
        .subscribe(response => {},
          error => {
            console.log(error);
            this.f.username.setErrors({notUnique: true});
          });
        }
  }

  onEmailInput() {
    if (this.f.email.valid && this.f.email.dirty) {
      this.authService.checkEmail(this.f.email.value)
        .subscribe(response => {},
          error => {
            console.log(error);
            this.f.email.setErrors({notUnique: true});
          });
        }
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;

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
        console.log(error);
      });
  }
}
