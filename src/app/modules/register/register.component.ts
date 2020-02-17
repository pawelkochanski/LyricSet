import { UserClient, RegisterVm, ApiException, UserVm } from './../../shared/lyricset.api';
import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {specialSignValidator} from './specialSignValidator';
import {passwordMatchValidator} from './passwordMatchValidator';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private readonly userClient: UserClient,
              private readonly router: Router) {
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
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const registerVm = new RegisterVm(this.registerForm.value);
    this.userClient.register(registerVm)
      .pipe(catchError((err: ApiException) => throwError(err)))
      .subscribe((user: UserVm) => {
        console.log(user);
        this.router.navigate(['/login']);
      }, (err: ApiException) => console.log(err));
    }
}
