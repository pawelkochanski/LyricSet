import { ErrorHandlerService } from './../services/error-handler.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {



  constructor(private router: Router,
              private errorhandler: ErrorHandlerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(req).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {

    return this.errorhandler.handleError(errorResponse);
  }
}
