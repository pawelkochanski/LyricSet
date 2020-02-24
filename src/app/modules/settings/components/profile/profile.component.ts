import { ErrorService } from './../../../../core/services/error.service';
import { SettingsService } from './../../../../core/services/settings.service';
import { AuthService } from 'app/core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userSub: Subscription;
  private user;
  private displayname: string;
  private bio: string;
  private url: string;
  profileForm: FormGroup;
  constructor(private fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly settingsService: SettingsService,
              private readonly errorService: ErrorService) { }

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.profileForm = this.fb.group({
      displayname: ['', [Validators.minLength(3)]],
      bio: [''],
      URL: ['', [Validators.pattern(new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))]]
    }
  );
  }

  onSubmit() {
    this.settingsService.updateProfile(this.f.displayname.value, this.f.bio.value, this.f.URL.value)
    .subscribe(response => {
      if (this.f.displayname.value) {
        this.user.displayname = this.f.displayname.value;
      }
      if (this.f.bio.value) {
        this.user.bio = this.f.bio.value;
      }
      if (this.f.URL.value) {
        this.user.url = this.f.URL.value;
      }
      this.authService.relogin(this.user);
    }, error => {
        this.errorService.handleError(error);
    });
  }
}
