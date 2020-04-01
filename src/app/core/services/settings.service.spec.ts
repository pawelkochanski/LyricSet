import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MysetsService} from './mysets.service';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';
import {SettingsService} from './settings.service';
import {Settings} from '../../shared/interfaces/settings';
import {AppSettings} from '../../shared/AppSettings';

describe('SettingsService', () => {
  let http: HttpTestingController;
  let service: SettingsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SettingsService]
      }
    );
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(SettingsService);
  });

  afterEach(() => {
    http.verify();
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });


  describe('updateProfile', () => {
    test('should send put http request', () => {
      const data: Settings = {displayname: 'displayname', bio: 'bio', url: 'url'};
      service.updateProfile(data).subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'users'
        && req.body === data
        && req.method === 'PUT');
    });
  });

  describe('updateAvatar', () => {
    test('should return null if avatar not set', () => {
      expect(service.updateAvatar(undefined)).toBeNull();
    });

    test('should send http request post if avatar set', () => {
      const avatar = new File([], 'avatar');
      const testData = new FormData();
      testData.append('file', avatar, avatar.name);
      service.updateAvatar(avatar).subscribe(() => {
      });
      const request = http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'images/avatar'
        && req.method === 'POST');
      expect(request.request.body).toEqual(testData);
    });
  });

  describe('removeAvatar', () => {
    test('should send http request delete', () => {
      service.removeAvatar('13').subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'images/13'
        && req.method === 'DELETE');
    });
  });
});
