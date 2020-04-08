import {User} from '../../shared/interfaces/user';
import {of} from 'rxjs';
import {Band} from '../../shared/interfaces/Band';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {ImagesData} from '../../shared/interfaces/imageData';

export class BandServiceSpecStub {
	public user: User = null;
	public bandlist: Band[] = [];
	public isLoading: boolean = false;
	public activeBand: Band = null;
	public isEditMode: boolean = false;
	public members: UserResponse[] = [];

	pushUserToMembers = () => {
	};
	deleteAvtiveBand = () => {
	};
	deleteBand = () => of({});
	getRoleToString = () => '';
	getUsers = () => {
	};
	getBands = () => of([{}] as Band[]);
	createBand = () => of({} as Band);
	updateBand = () => of({} as Band);
	getBand = () => of({} as Band);
	addTrack = () => ({} as boolean);
	addUserToBand = () => of({});
	uploadImageBand = () => of({} as ImagesData);
	removeImageBand = () => of({});
	removeTrack = () => {
	};
	refreshBandlist = () => {
	};
	amILeader = () => ({} as boolean);
	isNextDisabled = () => ({} as boolean);
	isPreviousDisabled = () => ({} as boolean);
	getNextTrackId = () => ({} as number);
	getPreviousTrackId = () => ({} as number);
	removeUserFromActiveBand = () => {
	};
	leaveBand = () => {
	};
}
