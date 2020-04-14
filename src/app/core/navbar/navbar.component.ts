import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'app/core/authentication/auth.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	isAuthenticated = false;
	isBurgerOpen = false;
	isSearchOpen = false;
	private userSub: Subscription;

	constructor(private readonly authService: AuthService,
	            private readonly toastr: ToastrService) {
	}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}

	onLogout(): void {
		this.authService.logout();
		this.toastr.success('You have been sucessfully logged out!');
	}

	handleClickOutside($event) {
		$event.stopPropagation();
		if (this.isBurgerOpen) {
			this.isBurgerOpen = false;
		}
	}

	closeMenu($event) {
		this.isBurgerOpen = false;
		$event.stopPropagation();
	}

	onBurgerClick($event) {
		this.isBurgerOpen = true;
		$event.stopPropagation();
	}

	onSearchClick($event: MouseEvent) {
		this.isSearchOpen = true;
	}

	onBackClick() {
		this.isSearchOpen = false;
	}
}
