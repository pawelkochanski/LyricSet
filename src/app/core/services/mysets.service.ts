import {Injectable} from '@angular/core';
import {testList} from '../../shared/constants';
import {Track} from '../../shared/interfaces/track';
import {LyricSet} from '../../shared/interfaces/lyric-set';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  isEditMode = false;
  activeSet: LyricSet;

  mysetlist: LyricSet[] = testList;

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }

  setActiveSet(activeSet: LyricSet) {
    this.activeSet = activeSet;
  }

  setEditMode(mode: boolean) {
    this.isEditMode = mode;
  }

  getSetIndex(set: LyricSet) {
    return this.mysetlist.indexOf(set);
  }

  getTrackIndex(track: Track): number {
    return this.activeSet.tracklist.indexOf(track);
  }

  addSet(result: string): void {
      this.mysetlist.push({name: result, description: '', tracklist: [], image: ''});
  }
}
