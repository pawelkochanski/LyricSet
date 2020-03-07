import {Errors} from '../../shared/enums/errors';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly router: Router,
              private readonly authService: AuthService,
              private readonly toastr: ToastrService) {
  }

  handleError(errorResponse: HttpErrorResponse): Errors {
    console.log(errorResponse);
    const message = errorResponse.error.message;
    console.log(message);
    switch (errorResponse.status) {
      case 500:
      case 504:
        this.toastr.error('Ooops! We\'ve got a problem on our server side...:( Try again later!', 'Server Error', {timeOut: 7000});
        this.authService.logout();
        return Errors.SERVER_ERROR;
      case 401:
        if (message === 'session expired') {
          this.authService.logout();
          this.toastr.error('Looks like your session has expired, try to login again.', 'Unauthorized', {timeOut: 7000});
          this.router.navigate(['login']);
          return Errors.UNAUTHORIZED;
        }
        this.toastr.error('You dont have permissions for this kind of activity :/');
        return Errors.NO_PERMISSIONS;
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
