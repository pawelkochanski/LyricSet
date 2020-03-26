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
        switch (message) {
          case 'band exists':
            this.toastr.error('Band with that name already exists');
            break;
          default:
            this.toastr.error('Ooops! We\'ve got a problem on our server side...:( Try again later!', 'Server Error');
        }
        break;
      case 504:
        this.toastr.error('Ooops! We\'ve got a problem on our server side...:( Try again later!', 'Server Error');
        this.router.navigate(['/home']);
        return Errors.SERVER_ERROR;
      case 401:
        this.authService.logout();
        this.router.navigate(['login']);
        this.toastr.error('Look like your token has expired :/');
        return Errors.UNAUTHORIZED;
      case 404:
        this.toastr.error('Looks like we dont have resource you are looking for.', 'Not found.');
        this.router.navigate(['../']);
        return Errors.NOT_FOUND;
      case 400:
        switch (message) {
          case 'user exists in band':
            this.toastr.error('User is already a member of your band!');
            return Errors.USERNAME_EXISTS;
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
          case 'track exists':
            return Errors.TRACK_EXISTS;
          default:
            this.toastr.error('You have sent an invalid request.');
            return Errors.BAD_REQUEST;
        }
    }

    return null;
  }

}
