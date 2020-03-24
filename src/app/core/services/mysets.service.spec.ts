import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MysetsService} from './mysets.service';
import {AppSettings} from '../../shared/AppSettings';
import {LyricSet} from '../../shared/interfaces/lyric-set';

describe('ErrorService', () => {
  let router: Router;
  let errorService: ErrorService;
  let toastr: ToastrService;
  let service: MysetsService;
  let http: HttpTestingController;

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
    service.getMySetList();
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets');
    expect(req.request.method).toBe('GET');
  });

  test('getSet should find proper set', () => {
    service.mysetlist = [mockSet];
    expect(service.getSet(mockSet.id)).toBe(mockSet);
  });

  test('addSet should sent http post request', () => {
    service.addSet('name');
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe({name: 'name'});
  });

  describe('updateActiveSet', () => {
    const name = 'name';
    const desc = 'desc';
    test('should set activeSet name and description', () => {
      service.activeSet = {name: '', description: ''} as LyricSet;
      service.updateActiveSet(name, desc);
      expect(service.activeSet.name).toEqual(name);
      expect(service.activeSet.description).toEqual(desc);
    });

    test('should return null when activeSet not set', () => {
      service.activeSet = null;
      expect(service.updateActiveSet('name', 'desc')).toBeNull();
    });
  });

  test('updateSet should call http request with put method', () => {
    const set = {id: '13', name: 'name', description: 'desc', tracklist: []} as LyricSet;
    service.updateSet(set);
    const req = http.expectOne(AppSettings.apiUrl + 'lyricsets/' + set.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({name: set.name, description: set.description, tracklist: set.tracklist});
  });

});
