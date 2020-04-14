import {ErrorService} from '../../../../core/services/error.service';
import {SettingsService} from '../../../../core/services/settings.service';
import {AuthService} from 'app/core/authentication/auth.service';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CropperComponent} from 'app/shared/components/cropper/cropper.component';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	profileForm: FormGroup;
	private userSub: Subscription;
	private user;

	constructor(private fb: FormBuilder,
	            private readonly authService: AuthService,
	            private readonly settingsService: SettingsService,
	            private readonly errorService: ErrorService,
	            private readonly mysetsService: MysetsService,
	            public dialog: MatDialog) {
	}

	get formControls() {
		return this.profileForm.controls;
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(CropperComponent, {
			width: '300px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.settingsService.updateAvatar(result).subscribe(response => {
					this.user.avatarId = response.imageId;
					this.authService.relogin(this.user);
				});
			}
		});
	}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe(user => {
			if (user) {
				this.user = user;
				console.log(user.avatarId);
			}
		});
		this.profileForm = this.fb.group({
				displayname: ['', [Validators.minLength(3)]],
				bio: [''],
				url: ['', [Validators.pattern(new RegExp('(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))]]
			}
		);
	}

	onSubmit() {
		if (!this.profileForm.valid) {
			return;
		}
		this.settingsService.updateProfile(this.profileForm.value)
			.subscribe(response => {
					this.user.displayname = response.displayname;
					this.user.bio = response.bio;
					this.user.url = response.url;
					this.authService.relogin(this.user);
				},
				error => {
					this.errorService.handleError(error);
				}
			);
	}

	onRemovePhoto() {
		this.settingsService.removeAvatar(this.user.avatarId)
			.subscribe(response => {
				console.log(response);
				this.user.avatarId = null;
				this.authService.relogin(this.user);
			});
	}

}
