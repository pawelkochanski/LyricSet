import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

constructor(private readonly router: Router) { }

handleError(errorResponse: HttpErrorResponse) {
  switch (errorResponse.status) {
  case 500:
  case 504:
    this.router.navigate(['server-error']);
    break;
  case 501:
    this.router.navigate(['login']);
  }

  return throwError(errorResponse);
}

}
