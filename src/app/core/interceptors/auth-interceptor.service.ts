import { Router } from '@angular/router';
import { AuthService } from 'app/core/authentication/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import {take, exhaustMap, catchError, map} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return this.authService.user.
    pipe(take(1),
    exhaustMap(user => {

      if (!user) {
        return next.handle(req);
      }
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' +
          user.token)
      });
      return next.handle(cloned);
    }));
  }
}
