import { AuthService } from 'app/core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.authservice.autoLogin();
  }
}
