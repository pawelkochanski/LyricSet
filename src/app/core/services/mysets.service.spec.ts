import {TestBed} from '@angular/core/testing';

import {MysetsService} from './mysets.service';


describe('MysetsService', () => {
  let service: MysetsService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(MysetsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should emit set change', () => {
      spyOn(service.getActiveSetChangeEmitter(), 'emit');
      service.emitActiveSetChange({name: 'emitset', description: 'emitset', image: '', tracklist: []});

      expect(service.getActiveSetChangeEmitter().emit).toHaveBeenCalledWith({
        name: 'emitset',
        description: 'emitset',
        image: '',
        tracklist: []
      });
    }
  );

  test('should emit track change', () => {
      spyOn(service.getActiveTrackChangeEmitter(), 'emit');
      service.emitActiveTrackChange({title: 'testtrack', artist: 'testartist', img: '', lyrics: 'lyrics'});

      expect(service.getActiveTrackChangeEmitter().emit).toHaveBeenCalledWith({
        title: 'testtrack',
        artist: 'testartist',
        img: '',
        lyrics: 'lyrics'
      });
    }
  );

  test('should change active set', () => {
    service.changeActiveSet({name: 'emitset', description: 'emitset', image: '', tracklist: []});
    expect(service.activeSet).toEqual({name: 'emitset', description: 'emitset', image: '', tracklist: []});
  });

  test('should change active track', () => {
    service.changeActiveTrack({title: 'testtrack', artist: 'testartist', img: '', lyrics: 'lyrics'});
    expect(service.activeTrack).toEqual({title: 'testtrack', artist: 'testartist', img: '', lyrics: 'lyrics'});
  });
});
