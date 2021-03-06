import {Component, Input, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {ErrorService} from '../../../../core/services/error.service';

@Component({
	selector: 'app-user-library',
	templateUrl: './user-library.component.html',
	styleUrls: ['./user-library.component.scss']
})
export class UserLibraryComponent implements OnInit {

	@Input() userId: string;
	isLoading = false;

	constructor(private readonly setService: MysetsService,
	            private readonly errorService: ErrorService) {
	}


	ngOnInit() {
		this.isLoading = true;
		this.setService.getSetList(this.userId).subscribe(
			setlist => {
				this.setService.setMySetList(setlist);
				this.setService.isGuestMode = true;
				this.isLoading = false;
			},
			error => {
				this.errorService.handleError(error);
			}
		);

	}

}
