import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';
import {RouterOutlet} from '@angular/router';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

	@ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;

	constructor(private readonly mysetsService: MysetsService
	) {

	}


	ngOnInit() {
		this.mysetsService.refreshSetlist();
		this.mysetsService.isGuestMode = false;
	}

	ngOnDestroy() {
		this.mysetsService.mysetlist = [];
		this.mysetsService.activeSet = null;
	}
}
