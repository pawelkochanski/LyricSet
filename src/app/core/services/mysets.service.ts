import {LyricSet} from '../../shared/interfaces/lyric-set';
import {Observable} from 'rxjs';
import {ErrorService} from './error.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
/*
 import {testList} from '../../shared/constants';
*/
import {Track} from '../../shared/interfaces/track';
import {environment} from 'environments/environment';
import {ImagesData} from '../../shared/interfaces/imageData';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  isLoading = false;
  isEditMode = false;
  activeSet: LyricSet = null;
  mysetlist: LyricSet[] = [];

  constructor(private readonly http: HttpClient, private readonly errorService: ErrorService) {

  }

  getMySetList(): Observable<any> {
    return this.http.get<LyricSet[]>(
      environment.apiUrl + 'lyricsets',
    );
  }

  setMySetList(setlist: LyricSet[]): void {
    this.mysetlist = setlist;
  }

  removeSet(setId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'lyricsets/user/' + setId
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
    return this.http.post(environment.apiUrl + 'lyricsets',
      {name: result});
  }

  updateActiveSet(name: string, desc: string, tracklist: Track[]): Observable<any> {
    if (name) {
      this.activeSet.name = name;
    }
    if (desc) {
      this.activeSet.description = desc;
    }
    return this.http.put(environment.apiUrl + 'lyricsets/' + this.activeSet.id,
      {name, description: desc, tracklist});
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
    return environment.apiUrl + 'images/' + imageId;
  }


  public uploadImageSet(image: any, setid: string): Observable<ImagesData> {
    console.log(image);
    const formData = new FormData();
    formData.append('file', image, image.filename);
    if (image) {
      return this.http.post<ImagesData>(
        environment.apiUrl + 'images/set/' + setid,
        formData);
    }
    return null;
  }

  public removeImageSet(imageId: string, setId): Observable<any> {
    const params = new HttpParams().set('setId', setId);
    return this.http.delete(environment.apiUrl + 'images/' + imageId,
      {params});
  }
}
