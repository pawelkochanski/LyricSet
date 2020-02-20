import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {specialSignValidator} from './specialSignValidator';
import {passwordMatchValidator} from './passwordMatchValidator';
import { AuthService } from 'app/core/authentication/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  usernames: string[];
  emails: string[];
  serverError = false;

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

    this.authService.getUsernames()
        .subscribe(usernames => {
          this.usernames = usernames;
        },
        error => {
          this.router.navigate(['server-error']);
        });
    this.authService.getEmails()
        .subscribe(emails => {
          this.emails = emails;
        },
          error => {
            this.router.navigate(['server-error']);
          });
  }


  onUsernameInput() {
    const control = this.f.username;
    if (control.valid && control.dirty) {
      const value = control.value;
      if (this.usernames.includes(value)) {
        control.setErrors({notUnique: true});
      }
    }

  }

  onEmailInput() {
    const control = this.f.email;
    if (control.valid && control.dirty) {
      const value = control.value;
      if (this.emails.includes(value)) {
        control.setErrors({notUnique: true});
      }
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
        this.router.navigate(['server-error']);
      });
  }

}
