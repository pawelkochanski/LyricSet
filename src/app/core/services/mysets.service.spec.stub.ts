import { of} from 'rxjs';
import {LyricSet} from '../../shared/interfaces/lyric-set';
import {ImagesData} from '../../shared/interfaces/imageData';
import {SearchBarResponse, SerachTrackResponse, TrackResponse} from '../../shared/interfaces/search-track-response';
import {LyricsResponse} from '../../shared/interfaces/lyrics-response';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {AppSettings} from '../../shared/AppSettings';

export class MysetsServiceSpecStub {
  isLoading = false;
  isEditMode = false;
  activeSet: LyricSet = null;
  mysetlist: LyricSet[] = [];
  isGuestMode: boolean;
  url = AppSettings.apiUrl;
  getMySetList = () => of([{}as LyricSet] as LyricSet[]);
  setMySetList = () => {};
  removeSet = () => of();
  setActiveSet = () => {};
  getSet = () => ({} as LyricSet);
  setEditMode = () => {};
  addSet = () => of({} as LyricSet);
  updateActiveSet = () => of();
  updateSet = () => of();
  refreshSetlist = () => {};
  getImageUrl = () => ({} as string);
  uploadImageSet = () => (of({} as ImagesData));
  removeImageSet = () => of();
  quickSearch = () => of({} as SearchBarResponse);
  getTrack = () => of({} as TrackResponse);
  getTrackLyrics = () => of({} as LyricsResponse);
  updateSets = () => {};
  getTrackIndex = () => ({} as number);
  handleParamSetId = () => {};
  isNextDisabled = () => ({} as boolean);
  isPreviousDisabled = () => ({} as boolean);
  getNextTrackId = () => ({} as number);
  getPreviousTrackId = () => ({} as number);
  getUser = () => of({} as UserResponse);
  getSetList = () => of([{}as LyricSet] as LyricSet[]);
  onImgError = () => {};
  rateSet = () => of({} as LyricSet);
  getTopSets = () => of([{}as LyricSet] as LyricSet[]);
  getTopSongs = () => of({} as SerachTrackResponse);
}