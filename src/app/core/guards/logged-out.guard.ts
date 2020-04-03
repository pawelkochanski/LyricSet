import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../authentication/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService,
              private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return this.router.createUrlTree(['/settings']);
      }
      return true;
    }));

  }
}
