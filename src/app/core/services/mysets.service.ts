import {LyricSet} from '../../shared/interfaces/lyric-set';
import {forkJoin, Observable} from 'rxjs';
import {ErrorService} from './error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SearchBarResponse, SerachTrackResponse, TrackResponse} from '../../shared/interfaces/search-track-response';
import {ImagesData} from '../../shared/interfaces/imageData';
import {map} from 'rxjs/operators';
import {AppSettings} from '../../shared/constants';
import {LyricsResponse} from '../../shared/interfaces/lyrics-response';
import {Track} from '../../shared/interfaces/track';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  isLoading = false;
  isEditMode = false;
  activeSet: LyricSet = null;
  mysetlist: LyricSet[] = [];

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService,
              private readonly toastr: ToastrService) {

  }

  getMySetList(): Observable<any> {
    return this.http.get<LyricSet[]>(
      AppSettings.apiUrl + 'lyricsets',
    );
  }

  setMySetList(setlist: LyricSet[]): void {
    this.mysetlist = setlist;
  }

  removeSet(setId: string): Observable<any> {
    return this.http.delete(AppSettings.apiUrl + 'lyricsets/user/' + setId
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

  addSet(result: string): Observable<any> {
    return this.http.post(AppSettings.apiUrl + 'lyricsets',
      {name: result});
  }

  updateActiveSet(name: string, desc: string, tracklist: SerachTrackResponse[]): Observable<any> {
    if (name) {
      this.activeSet.name = name;
    }
    if (desc) {
      this.activeSet.description = desc;
    }
    return this.updateSet(this.activeSet);
  }

  updateSet(set: LyricSet) {
    return this.http.put(AppSettings.apiUrl + 'lyricsets/' + set.id,
      {
        name: set.name,
        description: set.description,
        tracklist: set.tracklist
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
      }
    );
  }

  getImageUrl(imageId: string): string {
    return AppSettings.apiUrl + 'images/' + imageId;
  }


  public uploadImageSet(image: any, setid: string): Observable<ImagesData> {
    console.log(image);
    const formData = new FormData();
    formData.append('file', image, image.filename);
    if (image) {
      return this.http.post<ImagesData>(
        AppSettings.apiUrl + 'images/set/' + setid,
        formData);
    }
    return null;
  }

  public removeImageSet(imageId: string, setId): Observable<any> {
    const params = new HttpParams().set('setId', setId);
    return this.http.delete(AppSettings.apiUrl + 'images/' + imageId,
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
    return forkJoin([byTitle, byArtist])
      .pipe(map(responses => {
        return {
          byTitle: responses[0],
          byArtist: responses[1]
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
    console.log(sets);
    console.log(track);
    this.isLoading = true;

    let updated = 0;

    for (const set of sets) {
      set.tracklist.push(track);
      this.updateSet(set).subscribe(
        response => {
          updated++;
          if (updated === sets.length) {
            this.toastr.success('All sets successfully updated!');
          }
        },
        error => {
          this.errorService.handleError(error);
        }
      );
    }
  }
}
