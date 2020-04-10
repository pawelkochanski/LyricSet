import {Component, OnDestroy, OnInit} from '@angular/core';
import {BandService} from '../../core/services/band.service';
import {User} from '../../shared/interfaces/user';
import {RouterOutlet} from '@angular/router';
import {routerTransition} from '../../router.animations';

@Component({
	selector: 'app-bands',
	templateUrl: './bands.component.html',
	animations: [routerTransition],
	styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit, OnDestroy {


	public user: User;
	isLoading: boolean;

	constructor(private readonly bandSerivce: BandService) {

	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.bandSerivce.activeBand = null;
	}

	getState(outlet: RouterOutlet) {
		return outlet.activatedRouteData.state;
	}
}
