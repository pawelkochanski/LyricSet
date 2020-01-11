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

  emitActiveSetChange(set: LyricSet) {
    this.activeTrack = null;
    this.activeSet = set;
    this.activeSetChange.emit(set);
  }

  getActiveSetChangeEmitter(): EventEmitter<LyricSet> {
    return this.activeSetChange;
  }

  getActiveTrackChangeEmitter(): EventEmitter<Track> {
    return this.activeTrackChange;
  }

  emitActiveTrackChange(track: Track): void {
    this.activeTrack = track;
    this.activeTrackChange.emit(track);
  }
}
