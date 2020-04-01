import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MysetsService} from './mysets.service';
import {AppSettings} from '../../shared/AppSettings';
import {LyricSet} from '../../shared/interfaces/lyric-set';
import mock = jest.mock;
import {Observable, of, throwError} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {query} from '@angular/animations';
import {TrackResponse} from '../../shared/interfaces/search-track-response';
import {Track} from '../../shared/interfaces/track';

describe('MySetsService', () => {
  let router: Router;
  let errorService: ErrorService;
  let toastr: ToastrService;
  let service: MysetsService;
  let http: HttpTestingController;

  const trackResponse: TrackResponse = {
    track: {
      track_id: 13,
      track_name: 'nazwa',
      artist_name: 'artysta',
      artist_id: '13'
    }
  };

  const mockSet = {
    id: '13',
    name: 'Mockset',
    description: '',
    tracklist: [],
    imageId: ''
  } as LyricSet;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
        providers: [MysetsService,
          {
            provide: ErrorService, useClass: class {
              handleError = jest.fn();
            }
          },
          {
            provide: Router, useClass: class {
              navigate = jest.fn();
            }
          },
          {
            provide: ToastrService, useClass: class {
              success = jest.fn();
              error = jest.fn();
            }
          }]
      }
    );
    router = TestBed.get(Router);
    errorService = TestBed.get(ErrorService);
    toastr = TestBed.get(ToastrService);
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(MysetsService);
  });

  afterEach(() => {
    http.verify();
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  test('get my setlist should send http get request', () => {
    service.getMySetList().subscribe(
      (response) => {
        expect(response).toBe([mockSet]);
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets');
    expect(req.request.method).toBe('GET');
    req.flush([mockSet]);
  });

  test('removeSet should send http delete request', () => {
    service.removeSet(mockSet.id).subscribe(
      () => {
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets/' + mockSet.id);
    expect(req.request.method).toBe('DELETE');
  });

  test('getSet should find proper set', () => {
    service.mysetlist = [mockSet];
    expect(service.getSet(mockSet.id)).toBe(mockSet);
  });

  test('addSet should sent http post request', () => {
    service.addSet({name: 'name', isPrivate: true}).subscribe(
      response => {
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({name: 'name', isPrivate: true});
  });

  describe('updateActiveSet', () => {
    const name = 'name';
    const desc = 'desc';
    test('should set activeSet name and description', () => {
      service.activeSet = {name: '', description: ''} as LyricSet;
      service.updateActiveSet({name, description: desc, isPrivate: true});
      expect(service.activeSet.name).toEqual(name);
      expect(service.activeSet.description).toEqual(desc);
      expect(service.activeSet.isPrivate).toBeTruthy();
    });

    test('should return null when activeSet not set', () => {
      service.activeSet = null;
      expect(service.updateActiveSet({name, description: desc, isPrivate: true})).toBeNull();
    });
  });

  test('updateSet should call http request with put method', () => {
    const set = {id: '13', isPrivate: true, name: 'name', description: 'desc', tracklist: []} as LyricSet;
    service.updateSet(set).subscribe(
      () => {
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets/' + set.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({name: set.name, description: set.description, tracklist: set.tracklist, isPrivate: 'true'});
  });

  test('refreshSetlist should call getMySetListt', () => {
    service.getMySetList = jest.fn(() => of({setlist: [mockSet]}));
    service.refreshSetlist();
    expect(service.getMySetList).toHaveBeenCalled();
  });

  test('refreshSetlist should call ErrorService.handleError if error', () => {
    service.getMySetList = jest.fn(() => throwError(new Error('Test error')));
    service.refreshSetlist();
    expect(errorService.handleError).toHaveBeenCalledTimes(1);
  });

  test('getImageUrl should return valid image url from id', () => {
    expect(service.getImageUrl(mockSet.imageId)).toEqual(AppSettings.apiUrl + 'images/' + mockSet.imageId);
  });

  test('uploadImageSet should send http post request if image is set', () => {
    const testFile = new File([], 'testFIle');
    const testFormData = new FormData();
    testFormData.append('file', testFile, testFile.name);
    service.uploadImageSet(testFile, mockSet.id).subscribe(
      () => {
      }
    );
    const req = http.expectOne(AppSettings.apiUrl + 'images/set/' + mockSet.id);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testFormData);
  });

  test('uploadImageSet should return null if image is NOT set', () => {
    expect(service.uploadImageSet(null, mockSet.id)).toBeNull();
  });

  test('removeImageSet should send http delete request', () => {
    service.removeImageSet(mockSet.imageId, mockSet.id).subscribe(() => {
    });
    http.expectOne({method: 'DELETE', url: AppSettings.apiUrl + 'images/' + mockSet.imageId + '?setId=' + mockSet.id});
  });

  test('quickSearch should send 3 different http requests', () => {
    service.quickSearch('query', 1, 1).subscribe(() => {
    });
    const requests = http.match(() => true);
    expect(requests.length).toBe(3);
    expect(requests[0].request.url).toEqual(AppSettings.apiUrl + 'track/search/title');
    expect(requests[1].request.url).toEqual(AppSettings.apiUrl + 'track/search/artist');
    expect(requests[2].request.url).toEqual(AppSettings.apiUrl + 'users/search');
  });

  test('getTrack should send get http request', () => {

    service.getTrack('13').subscribe((response) => {
      expect(response).toEqual(trackResponse);
    });
    const req = http.expectOne(AppSettings.apiUrl + `track/13`);
    req.flush(trackResponse);
  });


  test('updateSets should call updateSet 3 times', () => {
    const sets = [mockSet, mockSet, mockSet];
    const track: Track = trackResponse.track;
    service.updateSet = jest.fn(() => of(null, null, null));
    service.updateSets(sets, track);
    expect(service.updateSet).toBeCalledTimes(sets.length);
    sets.forEach(set => {
      expect(set.tracklist.includes(track)).toBeTruthy();
    });
  });

  test('updateSets should call updateSet 2 times and handle1Error', () => {
    const sets = [mockSet, mockSet, mockSet];
    const track: Track = trackResponse.track;
    service.updateSet = jest.fn((set: LyricSet) => throwError(new Error('testMessage')));
    service.updateSets(sets, track);
    expect(errorService.handleError).toBeCalledTimes(3);
  });

  test('handleParamSetId sholud return if setId is empty', () => {
    expect(service.handleParamSetId('')).toBeUndefined();
    expect(router.navigate).not.toBeCalled();
  });

  test('handlePramSetId should navigate to /library if set is not in setilst', () => {
    service.mysetlist = [];
    service.handleParamSetId('11');
    expect(router.navigate).toBeCalledWith(['/library']);
  });

  test('handlePramSetId should set active set of setid', () => {
    service.mysetlist = [mockSet];
    service.handleParamSetId(mockSet.id);
    expect(service.activeSet).toEqual(mockSet);
    expect(service.isEditMode).toBeFalsy();
  });

  test('isNextDisabled shoult return true if track is last', () => {
    mockSet.tracklist = [trackResponse.track];
    service.activeSet = mockSet;
    expect(service.isNextDisabled(trackResponse.track.track_id)).toBeTruthy();
  });

  test('isNextDisabled shoult return true if false is not last', () => {
    const differentTrack = trackResponse.track;
    differentTrack.track_id = 12;
    mockSet.tracklist = [trackResponse.track, differentTrack];
    service.activeSet = mockSet;
    expect(service.isNextDisabled(trackResponse.track.track_id)).toBeFalsy();
  });


  test('isPreviousDisabled should return true if track is first', () => {
    mockSet.tracklist = [trackResponse.track];
    service.activeSet = mockSet;
    expect(service.isNextDisabled(trackResponse.track.track_id)).toBeTruthy();
  });

  test('isNextDisabled shoult return true if false is not first', () => {
    const differentTrack = trackResponse.track;
    differentTrack.track_id = 12;
    mockSet.tracklist = [differentTrack, trackResponse.track];
    service.activeSet = mockSet;
    expect(service.isNextDisabled(trackResponse.track.track_id)).toBeFalsy();
  });

  test('rateSet should send http put request', () => {
    service.activeSet = mockSet;
    const rate = 5;
    service.rateSet(5).subscribe(response => {
      expect(response).toEqual(mockSet);
    });
    const req = http.expectOne(request => request.method === 'PUT'
      && request.url === AppSettings.apiUrl + 'lyricsets/' + service.activeSet.id + '/rate');
    expect(req.request.params.get('rate')).toBe('5');
    req.flush({mockSet});
  });

  test('rateSet should throw error if activSet is undefined', () => {
    service.activeSet = undefined;
    service.rateSet(5).subscribe(response => {
      },
      error => {
        expect(error).not.toBeUndefined();
      });
  });

  test('getTopSets should send http get request', () => {
    service.getTopSets(3).subscribe(() => {
    });
    const request = http.expectOne(req => req.url === AppSettings.apiUrl + 'lyricsets/top/' + 3);
  });

  test('getTopSongsshould send http get request', () => {
    service.getTopSongs('3').subscribe(() => {
    });
    const request = http.expectOne(req =>
      req.url === AppSettings.apiUrl + '/track/search/popular');
    expect(request.request.params.get('count')).toBe('3');
  });

});
