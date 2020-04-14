import {MysetsService} from '../../../core/services/mysets.service';
import {ErrorService} from '../../../core/services/error.service';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CropperComponent} from '../cropper/cropper.component';
import {MatDialog} from '@angular/material/dialog';
import {AppSettings} from '../../AppSettings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StarRatingComponent} from 'ng-starrating';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {AuthService} from '../../../core/authentication/auth.service';

@Component({
	selector: 'app-set-header',
	templateUrl: './set-header.component.html',
	styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit, OnDestroy {
	@ViewChild('title', {static: false}) titleinput: ElementRef;
	@ViewChild('description', {static: false}) descinput: ElementRef;
	imageUrl: string;
	lyricsetForm: FormGroup;
	userSub: Subscription;
	user: User;

	constructor(private readonly mySetsService: MysetsService,
	            private readonly router: Router,
	            private readonly errorService: ErrorService,
	            public dialog: MatDialog,
	            private readonly fb: FormBuilder,
	            private readonly toastr: ToastrService,
	            private readonly authService: AuthService) {
	}

	ngOnInit() {
		this.imageUrl = AppSettings.apiUrl + this.mySetsService.activeSet.imageId;
		this.lyricsetForm = this.fb.group({
			name: ['', []],
			description: ['', []],
			isPrivate: ['', []]
		});
		this.userSub = this.authService.user.subscribe(
			user => {
				this.user = user;
			}
		);


	}

	onRemoveSet(): void {
		this.mySetsService.removeActiveSet();
	}

	startEdit(): void {
		this.mySetsService.setEditMode(true);
		this.lyricsetForm.controls.isPrivate.setValue(this.mySetsService.activeSet.isPrivate);
	}

	finishEdit(): void {
		if (this.lyricsetForm.valid) {
			this.mySetsService.updateActiveSet(this.lyricsetForm.value)
				.subscribe(() => {
					},
					error2 => {
						this.errorService.handleError(error2);
					});
		}
		this.mySetsService.setEditMode(false);

	}

	onEditImage(): void {
		const dialogRef = this.dialog.open(CropperComponent, {
			width: '300px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.mySetsService.uploadImageSet(result, this.mySetsService.activeSet.id).subscribe(response => {
					console.log(response);
					this.mySetsService.activeSet.imageId = response.imageId;
				});
			}
			console.log('The dialog was closed');
		});
	}

	onRemoveImage() {
		this.mySetsService.removeImageSet(this.mySetsService.activeSet.imageId, this.mySetsService.activeSet.id).subscribe(() => {
				this.mySetsService.activeSet.imageId = undefined;
			},
			error2 => {
				this.errorService.handleError(error2);
			});
	}

	onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {
		if (!this.user) {
			this.toastr.warning('You must be logged to rate LyricSets!');
			this.router.navigate(['/login']);
			return;
		}
		if (this.user.id === this.mySetsService.activeSet.ownerId) {
			this.toastr.warning('You cannot rate your own LyricSets!');
			return;
		}
		this.mySetsService.rateSet($event.newValue).subscribe(
			response => {
				this.mySetsService.activeSet.rating = response.rating;
				this.toastr.success(`Rated ${this.mySetsService.activeSet.name} with ${$event.newValue} stars!`);
			},
			error1 => {
				this.errorService.handleError(error1);
			}
		);
	}

	ngOnDestroy(): void {
		this.mySetsService.activeSet = null;
	}
}
