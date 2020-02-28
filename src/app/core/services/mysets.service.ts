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

  isEditMode = false;
  activeSet = new BehaviorSubject<LyricSet>(null);

  mysetlist: LyricSet[] = [];

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }

  getMySetList() {
    return this.http.get<LyricSet[]>(
      environment.apiUrl + 'lyricsets',
    );
  }

  removeSet(setId: string) {
    return this.http.delete(environment.apiUrl + 'lyricsets/user/' + setId
    );
  }

  setActiveSet(activeSet: LyricSet) {
    this.activeSet.next(activeSet);
  }

  getSet(setid: string) {
    return this.mysetlist.find(set => set.id === setid);
  }

  setEditMode(mode: boolean) {
    this.isEditMode = mode;
  }

  addSet(result: string): void {
      this.http.post(environment.apiUrl + 'lyricsets',
      {name : result}).subscribe(
        response => {}, error => {this.errorService.handleError(error); }
      );
      this.getMySetList();
  }
}
