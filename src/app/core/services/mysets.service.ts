import {EventEmitter, Injectable} from '@angular/core';
import {testList} from '../../shared/constants';
import {LyricSet, Track} from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  activeSet: {};
  activeTrack: Track;

  mysetlist: LyricSet[] = testList;

  activeSetChange = new EventEmitter<LyricSet>();
  activeTrackChange = new EventEmitter<Track>();


  changeActiveSet(set: LyricSet) {
    this.activeTrack = null;
    this.activeSet = set;
    this.emitActiveSetChange(set);
  }

  emitActiveSetChange(set: LyricSet) {
    this.activeSetChange.emit(set);
  }

  getActiveSetChangeEmitter(): EventEmitter<LyricSet> {
    return this.activeSetChange;
  }

  getActiveTrackChangeEmitter(): EventEmitter<Track> {
    return this.activeTrackChange;
  }

  changeActiveTrack(track: Track) {
    this.activeTrack = track;
    this.emitActiveTrackChange(track);
  }

  emitActiveTrackChange(track: Track): void {
    this.activeTrackChange.emit(track);
  }

  clearActives() {
    this.activeSet = null;
    this.activeTrack = null;
  }
}
