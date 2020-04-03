import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from 'app/core/authentication/auth.service';
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private readonly authService: AuthService,
              private readonly toastr: ToastrService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.toastr.success('You have been sucessfully logged out!');
  }

}
