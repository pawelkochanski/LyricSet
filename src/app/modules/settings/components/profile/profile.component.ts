import { ErrorService } from './../../../../core/services/error.service';
import { SettingsService } from './../../../../core/services/settings.service';
import { AuthService } from 'app/core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'app/shared/interfaces/user';
import { MatDialog } from '@angular/material';
import { CropperComponent } from 'app/modules/cropper/cropper.component';
import { environment } from 'environments/environment';

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
  private avatarUrl: string;
  profileForm: FormGroup;
  constructor(private fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly settingsService: SettingsService,
              private readonly errorService: ErrorService,
              public dialog: MatDialog) { }

  get f() {
    return this.profileForm.controls;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.updateAvatar(result).subscribe(response => {
          this.user.avatarId = response.avatarId;
          this.authService.relogin(this.user);
        });
      }
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
        if (user.avatarId) {
          this.avatarUrl = environment.apiUrl + 'avatars/' + user.avatarId;
        } else {
          this.avatarUrl = environment.defaultAvatar;
        }
        console.log(user.avatarId);
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
        this.f.displayname.setValue(null);
      }
      if (this.f.bio.value) {
        this.user.bio = this.f.bio.value;
        this.f.bio.setValue(null);
      }
      if (this.f.URL.value) {
        this.user.url = this.f.URL.value;
        this.f.URL.setValue(null);
      }
      this.authService.relogin(this.user);
    }, error => {
        this.errorService.handleError(error);
    });
  }

  onRemovePhoto() {
    this.settingsService.removeAvatar(this.user.avatarId)
    .subscribe(response => {
      console.log(response);
      this.user.avatarId = null;
      this.authService.relogin(this.user);
    });
  }

  onImgError($event) {
    $event.target.src = environment.defaultAvatar;
  }
}
