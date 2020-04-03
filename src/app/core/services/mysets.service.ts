import {LyricSet} from '../../shared/interfaces/lyric-set';
import {forkJoin, Observable, throwError} from 'rxjs';
import {ErrorService} from './error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SearchBarResponse, SerachTrackResponse, TrackResponse} from '../../shared/interfaces/search-track-response';
import {ImagesData} from '../../shared/interfaces/imageData';
import {map} from 'rxjs/operators';
import {AppSettings} from '../../shared/AppSettings';
import {LyricsResponse} from '../../shared/interfaces/lyrics-response';
import {Track} from '../../shared/interfaces/track';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Errors} from '../../shared/enums/errors';
import {AddSetData} from '../../shared/interfaces/addSetData';
import {UserResponse} from '../../shared/interfaces/userResponse';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  isLoading = false;
  isEditMode = false;
  activeSet: LyricSet = null;
  mysetlist: LyricSet[] = [];
  isGuestMode: boolean;
  url = AppSettings.apiUrl;

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService,
              private readonly toastr: ToastrService,
              private readonly router: Router) {

  }

  getMySetList(): Observable<LyricSet[]> {
    return this.http.get<LyricSet[]>(
      this.url + 'lyricsets',
    );
  }

  setMySetList(setlist: LyricSet[]): void {
    this.mysetlist = setlist;
  }

  removeSet(setId: string): Observable<void> {
    return this.http.delete<void>(this.url + 'lyricsets/' + setId
    );
  }

  setActiveSet(activeSet: LyricSet): void {
    this.activeSet = activeSet;
  }

  getSet(setid: string): LyricSet {
    return this.mysetlist.find(set => set.id === setid);
  }

  setEditMode(mode: boolean): void {
    this.isEditMode = mode;
  }

  addSet(value: AddSetData): Observable<LyricSet> {
    return this.http.post<LyricSet>(this.url + 'lyricsets',
      value);
  }

  updateActiveSet(lyriccsetFormValue: { name: string, description: string, isPrivate: boolean }): Observable<void> {
    if (!this.activeSet) {
      return null;
    }
    if (lyriccsetFormValue.name) {
      this.activeSet.name = lyriccsetFormValue.name;
    }
    if (lyriccsetFormValue.description) {
      this.activeSet.description = lyriccsetFormValue.description;
    }
    this.activeSet.isPrivate = lyriccsetFormValue.isPrivate;
    return this.updateSet(this.activeSet);
  }

  updateSet(set: LyricSet): Observable<void> {
    return this.http.put<void>(this.url + 'lyricsets/' + set.id,
      {
        name: set.name,
        description: set.description,
        tracklist: set.tracklist,
        isPrivate: `${set.isPrivate}`
      });
  }

  refreshSetlist(): void {
    this.isLoading = true;
    this.getMySetList().subscribe(
      setlist => {
        this.setMySetList(setlist);
        this.isLoading = false;
      },
      error => {
        this.errorService.handleError(error);
        this.isLoading = false;
      }
    );
  }

  getImageUrl(imageId: string): string {
    return AppSettings.apiUrl + 'images/' + imageId;
  }


  public uploadImageSet(image: File, setid: string): Observable<ImagesData> {
    if (image) {
      const formData = new FormData();
      formData.append('file', image, image.name);
      return this.http.post<ImagesData>(
        AppSettings.apiUrl + 'images/set/' + setid,
        formData);
    }
    return null;
  }

  public removeImageSet(imageId: string, setId: string): Observable<void> {
    const params = new HttpParams().set('setId', setId);
    return this.http.delete<void>(AppSettings.apiUrl + 'images/' + imageId,
      {params});
  }

  public quickSearch(query: string, pagesize: number, page: number): Observable<SearchBarResponse> {

    const byTitle = this.http.get<SerachTrackResponse>(AppSettings.apiUrl + 'track/search/title', {
      params: new HttpParams()
        .append('track', query)
        .append('page_size', `${pagesize}`)
        .append('page', `${page}`)
    });
    const byArtist = this.http.get<SerachTrackResponse>(AppSettings.apiUrl + 'track/search/artist', {
      params: new HttpParams()
        .append('track', query)
        .append('page_size', `${pagesize}`)
        .append('page', `${page}`)
    });
    const users = this.http.get<UserResponse[]>(AppSettings.apiUrl + 'users/search', {
      params: new HttpParams()
        .append('user', query)
    });
    return forkJoin([byTitle, byArtist, users])
      .pipe(map(responses => {
        responses[2].splice(3);
        return {
          byTitle: responses[0],
          byArtist: responses[1],
          users: responses[2],
        };
      }));
  }

  getTrack(trackId: string): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(AppSettings.apiUrl + `track/${trackId}`);
  }

  getTrackLyrics(trackId: string): Observable<LyricsResponse> {
    return this.http.get<LyricsResponse>(AppSettings.apiUrl + `track/lyrics/${trackId}`);
  }

  updateSets(sets: LyricSet[], track: Track): void {
    this.isLoading = true;

    let updated = 0;

    for (const set of sets) {
      set.tracklist.push(track);
      this.updateSet(set).subscribe(
        () => {
          updated++;
          if (updated === sets.length) {
            this.toastr.success('All sets successfully updated!');
          }
        },
        error => {
          const errorRes = this.errorService.handleError(error);
          if (errorRes === Errors.TRACK_EXISTS) {
            this.toastr.error('Set "' + set.name + '" alerady includes that song!');
          }
        }
      );
    }
  }

  getTrackIndex(track: Track): number {
    return this.activeSet.tracklist.indexOf(track);
  }

  handleParamSetId(setid: string): void {
    if (!setid) {
      return;
    }
    if (!this.mysetlist.find(set => set.id === setid)) {
      this.router.navigate(['/library']);
    }
    this.setActiveSet(this.getSet(setid));
    this.setEditMode(false);
  }

  isNextDisabled(trackId: number): boolean {
    const exists = this.activeSet.tracklist.find(track => track.track_id === trackId);
    return this.getTrackIndex(exists) === this.activeSet.tracklist.length - 1;
  }

  isPreviousDisabled(trackId: number): boolean {
    const exists = this.activeSet.tracklist.find(track => track.track_id === trackId);
    return this.getTrackIndex(exists) === 0;
  }

  getNextTrackId(trackId: number): number {
    const exists = this.activeSet.tracklist.find(track => track.track_id === trackId);
    const next = this.activeSet.tracklist[this.getTrackIndex(exists) + 1];
    if (next) {
      return next.track_id;
    } else {
      return null;
    }
  }

  getPreviousTrackId(trackId: number) {
    const exists = this.activeSet.tracklist.find(track => track.track_id === trackId);
    const previous = this.activeSet.tracklist[this.getTrackIndex(exists) - 1];
    if (previous) {
      return previous.track_id;
    } else {
      return null;
    }
  }

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(AppSettings.apiUrl + 'users/' + userId);
  }

  getSetList(userId: string): Observable<LyricSet[]> {
    return this.http.get<LyricSet[]>(AppSettings.apiUrl + 'users/' + userId + '/setlist');
  }

  onImgError($event): void {
    $event.target.src = AppSettings.defaultAvatar;
  }

  rateSet(rate: number): Observable<LyricSet> {
    if (!this.activeSet) {
      return throwError(new Error('no active set'));
    }
    return this.http.put<LyricSet>(AppSettings.apiUrl + 'lyricsets/' + this.activeSet.id + '/rate', {},
      {
        params: new HttpParams()
          .append('rate', `${rate}`)
      });
  }

  getTopSets(top: number): Observable<LyricSet[]> {
    return this.http.get<LyricSet[]>(AppSettings.apiUrl + 'lyricsets/top/' + top);
  }

  getTopSongs(count: string): Observable<SerachTrackResponse> {
    return this.http.get<SerachTrackResponse>(AppSettings.apiUrl + '/track/search/popular',
      {params: new HttpParams().append('count', count)});
  }

}
