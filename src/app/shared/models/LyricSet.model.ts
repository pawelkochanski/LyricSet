import {Track} from './Track.model';

export class LyricSet {
  constructor(public name: string, public description: string, public image: string, public tracklist: Track[]) {
  }

  getTrackList() {
    return this.tracklist;
  }

  addTrack(track: Track) {
    this.tracklist.push(track);
  }
}
