import {EventEmitter, Injectable} from '@angular/core';
import {LyricSet} from '../../shared/models/LyricSet.model';
import {Track} from '../../shared/models/Track.model';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {
  mySetList: LyricSet[] = [new LyricSet('12-12-2004', 'Koncert taki i taki', '', [
    new Track('Perfect',
      'Ed Sheeran',
      'https://image.ceneostatic.pl/data/products/30480327/i-ed-sheeran-x-deluxe-edition-cd.jpg', 'Tekst'),
    new Track('Perfect',
      'Ed Sheeran',
      'https://image.ceneostatic.pl/data/products/30480327/i-ed-sheeran-x-deluxe-edition-cd.jpg', 'Tekst')
    , new Track('Perfect',
      'Ed Sheeran',
      'https://image.ceneostatic.pl/data/products/30480327/i-ed-sheeran-x-deluxe-edition-cd.jpg', 'Tekst')
  ]),
    new LyricSet('AAAAAA', 'AAAAAAAAA', '', [
      new Track('AAAAAA',
        'Ed Sheeran',
        '', 'Tekst'),
      new Track('AAAAAA',
        'Ed Sheeran',
        '', 'Tekst'),
      new Track('AAAAAA',
        'Ed Sheeran',
        '', 'Tekst'),
      new Track('AAAAAA',
        'Ed Sheeran',
        '', 'Tekst'),
      new Track('AAAAAA',
        'Ed Sheeran',
        '', 'Tekst')
    ])];
  activeSetChange = new EventEmitter<LyricSet>();
  activeTrackChange = new EventEmitter<Track>();

  emitActiveSetChange(set: LyricSet) {
    this.activeSetChange.emit(set);
  }

  getActiveSetChangeEmitter() {
    return this.activeSetChange;
  }

  getActiveTrackChangeEmitter() {
    return this.activeTrackChange;
  }
  emitActiveTrackChange(track: Track) {
    this.activeTrackChange.emit(track);
  }
  constructor() {

  }
}
