import {UsernameDialogComponent} from './../username-dialog/username-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from '../../../../core/services/error.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PasswordDialogComponent} from '../password-dialog/password-dialog.component';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	constructor(public readonly dialog: MatDialog,
	            private readonly authService: AuthService,
	            private readonly errorService: ErrorService,
	            private readonly toastr: ToastrService) {
	}

	openPasswordDialog(): void {
		const dialogRef = this.dialog.open(PasswordDialogComponent, {
			width: '300px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result.password) {
				this.authService.changePassword(result)
					.subscribe(() => {
						this.toastr.success('Please, log in again.', 'Your password has been changed!');
						this.authService.logout();
					});
			}

		});
	}

	openUsernameDialog() {
		const dialogRef = this.dialog.open(UsernameDialogComponent, {
			width: '300px'
		});
	}

	ngOnInit() {
	}

	onSubmit() {

	}
}
