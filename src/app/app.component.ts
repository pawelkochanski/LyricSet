import { AuthService } from 'app/core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routerTransition} from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routerTransition],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.authservice.autoLogin();
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
