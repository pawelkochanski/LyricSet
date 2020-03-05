import { LyricSet } from './../../shared/interfaces/lyric-set';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
// import {testList} from '../../shared/constants';
import {Track} from '../../shared/interfaces/track';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  constructor(private readonly http: HttpClient, private readonly errorService: ErrorService) {

  }
  isLoading = false;
  isEditMode = false;
  activeSet: LyricSet = null;

  mysetlist: LyricSet[] = [];

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }

  getMySetList() {
    return this.http.get<LyricSet[]>(
      environment.apiUrl + 'lyricsets',
    );
  }

  setMySetList(setlist: LyricSet[]) {
    this.mysetlist = setlist;
  }

  removeSet(setId: string) {
    return this.http.delete(environment.apiUrl + 'lyricsets/user/' + setId
    );
  }

  setActiveSet(activeSet: LyricSet) {
    this.activeSet = activeSet;
  }

  getSet(setid: string) {
    return this.mysetlist.find(set => set.id === setid);
  }

  setEditMode(mode: boolean) {
    this.isEditMode = mode;
  }

  addSet(result: string) {
    return this.http.post(environment.apiUrl + 'lyricsets',
      {name : result});
  }

  updateActiveSet(name: string, desc: string) {
    if (name) {
      this.activeSet.name = name;
    }
    if (desc) {
      this.activeSet.description = desc;
    }
    return this.http.put(environment.apiUrl + 'lyricsets/' + this.activeSet.id,
    {name, description: desc});
  }

  refreshSetlist() {
    this.isLoading = true;
    this.getMySetList().subscribe(
      setlist => {this.setMySetList(setlist);
                  this.isLoading = false; },
      error => {this.errorService.handleError(error); }
    );
  }
}
