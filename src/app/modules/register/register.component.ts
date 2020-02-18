import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {specialSignValidator} from './specialSignValidator';
import {passwordMatchValidator} from './passwordMatchValidator';

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
              private http: HttpClient) {
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
    const {username, email, password, repPassword} = this.registerForm.value;
    this.http.post(
      'http://localhost:4200/api/users/register',
      {
        username, email, password
      }
    ).subscribe(response => {console.log(response); });
  }
}
