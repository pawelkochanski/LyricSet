import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Band, Member, MemberRoles} from '../../shared/interfaces/Band';
import {AppSettings} from '../../shared/AppSettings';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../shared/interfaces/user';
import {AuthService} from '../authentication/auth.service';
import {ErrorService} from './error.service';
import {Track} from '../../shared/interfaces/track';
import {ImagesData} from '../../shared/interfaces/imageData';
import {ToastrService} from 'ngx-toastr';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {MysetsService} from './mysets.service';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class BandService {

	public user: User;
	public bandlist: Band[];
	public isLoading: boolean;
	public activeBand: Band;
	public isEditMode: boolean;
	public members: UserResponse[] = [];
	private userSub: Subscription;

	constructor(private readonly http: HttpClient,
	            private readonly errorService: ErrorService,
	            private readonly authService: AuthService,
	            private readonly toastr: ToastrService,
	            private readonly setService: MysetsService,
	            private readonly router: Router) {
		this.userSub = this.authService.user.subscribe(
			user => {
				this.user = user;
			}
		);

	}

	pushUserToMembers(member: Member): void {
		this.setService.getUser(member.userId).subscribe(
			response => {
				this.members.push(response);
			}
		);
	}

	deleteAvtiveBand(): void {
		if (!this.activeBand) {
			return;
		}
		this.deleteBand(this.activeBand.id).subscribe(
			() => {
				this.activeBand = null;
				this.router.navigate(['/bands']);
			}
		);
	}

	deleteBand(bandid: string): Observable<void> {
		return this.http.delete<void>(AppSettings.apiUrl + 'bands/' + bandid);
	}


	getRoleToString(userId: string): string {
		const member = this.activeBand.members.find(user => user.userId === userId);
		if (!member) {
			return '';
		}
		return MemberRoles[member.role];
	}

	getUsers(): void {
		this.activeBand.members.forEach(
			member => {
				this.pushUserToMembers(member);
			}
		);
	}

	getBands(): Observable<Band[]> {
		return this.http.get<Band[]>(AppSettings.apiUrl + 'bands');
	}

	createBand(name: string): Observable<Band> {
		return this.http.post<Band>(AppSettings.apiUrl + 'bands', {name});
	}

	updateBand(band: Band): Observable<Band> {
		return this.http.put<Band>(AppSettings.apiUrl + 'bands/' + band.id, band);
	}

	getBand(bandid: string): Observable<Band> {
		return this.http.get<Band>(AppSettings.apiUrl + 'bands/' + bandid);
	}

	addTrack(band: Band, track: Track): boolean {
		const duplicate = band.tracklist.find(song => song.track_id === track.track_id);
		if (duplicate) {
			this.toastr.error('This band already has that song in their live set!');
			return false;
		}
		band.tracklist.push(track);
		return true;
	}

	addUserToBand(bandid: string, userid: string): Observable<void> {
		return this.http.put<void>(AppSettings.apiUrl + 'bands/' + bandid + '/users/' + userid, {});
	}

	public uploadImageBand(image: any, bandid: string): Observable<ImagesData> {
		if (image) {
			const formData = new FormData();
			formData.append('file', image, image.filename);
			return this.http.post<ImagesData>(
				AppSettings.apiUrl + 'images/band/' + bandid,
				formData);
		}
		return null;
	}

	public removeImageBand(imageId: string, bandid: string): Observable<void> {
		const params = new HttpParams().set('bandId', bandid);
		return this.http.delete<void>(AppSettings.apiUrl + 'images/' + imageId,
			{params});
	}

	removeTrack(track: Track): void {
		this.activeBand.tracklist.splice(this.activeBand.tracklist.indexOf(track), 1);
	}

	refreshBandlist(): void {
		this.isLoading = true;
		this.getBands().subscribe(
			bandlist => {
				this.bandlist = bandlist;
				this.isLoading = false;
			},
			error => {
				this.errorService.handleError(error);
			}
		);
	}


	amILeader(band): boolean {
		const member = band.members.find(element => element.userId === this.user.id);
		if (!member) {
			return false;
		}
		return member.role === MemberRoles.Leader;
	}

	isNextDisabled(trackId: number): boolean {
		const exists = this.activeBand.tracklist.find(track => track.track_id === trackId);
		return this.activeBand.tracklist.indexOf(exists) === this.activeBand.tracklist.length - 1;
	}

	isPreviousDisabled(trackId: number): boolean {
		const exists = this.activeBand.tracklist.find(track => track.track_id === trackId);
		return this.activeBand.tracklist.indexOf(exists) === 0;
	}


	getNextTrackId(trackId: number): number {
		const exists = this.activeBand.tracklist.find(track => track.track_id === trackId);
		const next = this.activeBand.tracklist[this.activeBand.tracklist.indexOf(exists) + 1];
		if (next) {
			return next.track_id;
		} else {
			return null;
		}
	}

	getPreviousTrackId(trackId: number) {
		const exists = this.activeBand.tracklist.find(track => track.track_id === trackId);
		const previous = this.activeBand.tracklist[this.activeBand.tracklist.indexOf(exists) - 1];
		if (previous) {
			return previous.track_id;
		} else {
			return null;
		}
	}


	removeUserFromActiveBand(id: string): void {
		this.http.delete(AppSettings.apiUrl + 'bands/' + this.activeBand.id + '/users/' + id)
			.subscribe(
				() => {
					this.getBand(this.activeBand.id).subscribe(
						band => {
							this.activeBand = band;
							this.members = [];
							this.getUsers();
							this.isLoading = false;
						},
						error => {
							this.isLoading = false;
							this.errorService.handleError(error);
						}
					);
				},
				error1 => {
					this.isLoading = false;
					this.errorService.handleError(error1);
				}
			);
	}

	leaveBand(): void {
		this.http.delete(AppSettings.apiUrl + 'bands/' + this.activeBand.id + '/users/' + this.user.id)
			.subscribe(
				() => {
					this.router.navigate(['/bands']);
				},
				error => {
					this.isLoading = false;
					this.errorService.handleError(error);
				}
			);
	}
}
