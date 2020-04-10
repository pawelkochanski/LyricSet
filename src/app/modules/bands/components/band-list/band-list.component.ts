import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../../shared/interfaces/user';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {MatDialog} from '@angular/material';
import {CreateBandDialogComponent} from '../create-band-dialog/create-band-dialog.component';

@Component({
	selector: 'app-band-list',
	templateUrl: './band-list.component.html',
	styleUrls: ['./band-list.component.scss']
})
export class BandListComponent implements OnInit {


	public user: User;
	isLoading: boolean;
	private userSub: Subscription;

	constructor(private readonly bandSerivce: BandService,
	            private readonly errorService: ErrorService,
	            private readonly setService: MysetsService,
	            private readonly authService: AuthService,
	            public dialog: MatDialog) {

	}

	ngOnInit(): void {
		this.bandSerivce.refreshBandlist();
		this.userSub = this.authService.user.subscribe(
			user => {
				this.user = user;
			}
		);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(CreateBandDialogComponent, {
			width: '300px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.bandSerivce.refreshBandlist();
		});
	}

}
