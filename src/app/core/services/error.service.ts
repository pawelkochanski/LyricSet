import { Errors } from './../../shared/enums/errors';

import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

constructor(private readonly router: Router,
            private readonly authService: AuthService) { }

handleError(errorResponse: HttpErrorResponse): Errors {
  console.log(errorResponse);
  const status = errorResponse.status;
  const message = errorResponse.error.message;
  console.log(message);
  switch (errorResponse.status) {
  case 500:
  case 504:
    return Errors.SERVER_ERROR;
    break;
  case 401:
    this.authService.logout();
    this.router.navigate(['login']);
    return Errors.UNAUTHORIZED;
    break;
  case 400:
    switch (message) {
      case 'Invalid credentials':
        return Errors.INVALID_CREDENTIALS;
      case 'username is required':
        return Errors.USERNAME_REQUIRED;
      case 'password is required':
        return Errors.PASSWORD_REQUIRED;
      case 'email exists':
        return Errors.EMAIL_EXISTS;
      case 'username exists':
        return Errors.USERNAME_EXISTS;
    }
  }

  return null;
}

}
