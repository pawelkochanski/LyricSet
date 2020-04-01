import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';
import {BandService} from './band.service';
import {MysetsService} from './mysets.service';
import {of, throwError} from 'rxjs';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {User} from '../../shared/interfaces/user';
import {Roles} from '../../shared/enums/roles';
import {Band, Member, MemberRoles} from '../../shared/interfaces/Band';
import {AppSettings} from '../../shared/AppSettings';
import {Track} from '../../shared/interfaces/track';
import {error} from 'util';

describe('BandService', () => {
  let router: Router;
  let errorService: ErrorService;
  let toastr: ToastrService;
  let service: BandService;
  let setService: MysetsService;
  let http: HttpTestingController;

  const userData = {
    username: 'username',
    displayname: 'displayname',
    email: '',
    role: Roles.User,
    id: '1',
    bio: '',
    url: '',
    avatarId: '',
    _token: 'token'
  };
  const userResponse: UserResponse = {
    id: '1',
    displayname: 'displayname',
    bio: '',
    avatarId: '',
    url: '',
  };
  const user = new User(userData.id,
    userData.username,
    userData.email,
    userData.role,
    userData.displayname,
    userData.bio,
    userData.url,
    userData.avatarId,
    userData._token);
  const member = {role: MemberRoles.Leader, userId: user.id} as Member;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [BandService,
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
        },
        {
          provide: MysetsService, useClass: class {
            getUser = jest.fn(() => of(userResponse));
          }
        }]
    });
    router = TestBed.get(Router);
    errorService = TestBed.get(ErrorService);
    toastr = TestBed.get(ToastrService);
    http = TestBed.get(HttpTestingController);
    setService = TestBed.get(MysetsService);
    service = TestBed.get(BandService);
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('pushUserToMember', () => {

    test('should push user to members', () => {
      service.pushUserToMembers(member);
      expect(setService.getUser).toHaveBeenCalledTimes(1);
      expect(service.members.includes(userResponse));
    });
  });

  describe('deleteActiveBand', () => {
    test('should call deleteBand and set active band to null', () => {
      service.activeBand = {id: '13'} as Band;
      service.deleteBand = jest.fn(() => of(null));
      service.deleteAvtiveBand();
      expect(service.deleteBand).toBeCalled();
      expect(router.navigate).toBeCalled();
      expect(service.activeBand).toBeNull();
    });
  });

  describe('deleteBand', () => {
    test('should send http delete request', () => {
      service.deleteBand('17').subscribe(() => {
      });
      http.expectOne(req => req.url === AppSettings.apiUrl + 'bands/17');
    });
  });

  describe('getRoleToString', () => {
    test('should return valid role if user is in band', () => {
      service.activeBand = {members: [member]} as Band;
      expect(service.getRoleToString(member.userId)).toEqual(MemberRoles[member.role]);
    });
  });

  describe('getUsers', () => {
    test('should call pushUserToMembers', () => {
      service.activeBand = {members: [member]} as Band;
      service.pushUserToMembers = jest.fn();
      service.getUsers();
      expect(service.pushUserToMembers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBands', () => {
    test('should send http request get', () => {
      service.getBands().subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands'
        && req.method === 'GET');
    });
  });

  describe('createBand', () => {
    test('should send http request post', () => {
      service.createBand('name').subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands'
        && req.method === 'POST');
    });
  });

  describe('updateBand', () => {
    test('should send http request put', () => {
      service.updateBand({id: '13'} as Band).subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + '13'
        && req.method === 'PUT');
    });
  });

  describe('getBand', () => {
    test('should send http request get', () => {
      service.getBand('13').subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + '13'
        && req.method === 'GET');
    });
  });

  describe('addTrack', () => {
    const track = {track_id: 13} as Track;
    test('should return false if track is duplicate', () => {
      const band = {tracklist: [track]} as Band;
      expect(service.addTrack(band, track)).toBeFalsy();
    });

    test('should return true and push trackif it is not a duplicate', () => {
      const band = {tracklist: []} as Band;
      expect(service.addTrack(band, track)).toBeTruthy();
      expect(band.tracklist.includes(track)).toBeTruthy();
    });
  });

  describe('Add user to Band', () => {
    test('should send http request put', () => {
      service.addUserToBand('1', '2').subscribe(() => {
      });
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + '1' + '/users/' + '2' &&
        req.method === 'PUT');
    });
  });

  describe('uploadImageBand', () => {
    test('uploadImageBandshould send http post request if image is set', () => {
      const testFile = new File([], 'testFIle');
      const testFormData = new FormData();
      const band = {id: '13'} as Band;
      testFormData.append('file', testFile, testFile.name);
      service.uploadImageBand(testFile, band.id).subscribe(
        () => {
        }
      );
      const req = http.expectOne(AppSettings.apiUrl + 'images/band/' + band.id);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(testFormData);
    });

    test('uploadImageBand should return null if image is NOT set', () => {
      const band = {id: '13'} as Band;
      expect(service.uploadImageBand(null, band.id)).toBeNull();
    });
  });

  describe('removeImageBand', () => {
    test('should send http request delete with bandid param', () => {
      service.removeImageBand('1', '2').subscribe();
      http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'images/1' &&
        req.method === 'DELETE' &&
        req.params.get('bandId') === '2'
      );
    });
  });

  describe('removeTrack', () => {
    test('should remove track from activeBand tracklist', () => {
      const track = {track_id: 13} as Track;
      const band = {tracklist: [track]} as Band;
      service.activeBand = band;
      service.removeTrack(track);
      expect(band.tracklist.length).toBe(0);
    });
  });

  describe('refrehBandlist', () => {
    test('should set bandlist', () => {
      service.getBands = jest.fn(() => of([{id: 'test'} as Band]));
      service.refreshBandlist();
      expect(service.bandlist).toEqual([{id: 'test'} as Band]);
    });

    test('should call handleError on error', () => {
      service.getBands = jest.fn(() => throwError(new Error()));
      service.refreshBandlist();
      expect(errorService.handleError).toBeCalled();
    });
  });

  describe('amILeader', () => {
    beforeEach(() => {
      service.user = {id: '13'} as User;
    });
    test('should return true if user is leader', () => {
      const band = {members: [{role: MemberRoles.Leader, userId: '13'}]} as Band;
      expect(service.amILeader(band)).toBeTruthy();
    });

    test('should return false if user is not a leader', () => {
      const band = {members: [{role: MemberRoles.Member, userId: '13'}]} as Band;
      expect(service.amILeader(band)).toBeFalsy();
    });

    test('should return false if user is not a member', () => {
      const band = {members: [{role: MemberRoles.Member, userId: '14'}]} as Band;
      expect(service.amILeader(band)).toBeFalsy();
    });
  });

  describe('removeUserFromActiveBand', () => {
    let band;
    beforeEach(() => {
      band = {id: '12'} as Band;
      service.activeBand = band;
      service.getUsers = jest.fn();
      service.getBand = jest.fn((bandid) =>
        of(band)
      );
    });

    test('should set activeBand for new band, refresh members and call getUsers on succes', () => {
      service.removeUserFromActiveBand('13');
      const request = http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + service.activeBand.id + '/users/' + '13' &&
        req.method === 'DELETE');
      request.flush({});
      expect(service.activeBand).toEqual(band);
      expect(service.getUsers).toBeCalled();
      expect(service.isLoading).toBeFalsy();

    });

    test('should call handleError on error', () => {
      service.removeUserFromActiveBand('13');
      const request = http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + service.activeBand.id + '/users/' + '13' &&
        req.method === 'DELETE');
      request.error(new ErrorEvent('testError'));
      expect(errorService.handleError).toBeCalled();
      expect(service.isLoading).toBeFalsy();

    });
  });

  describe('leaveBand', () => {

    beforeEach(() => {
      service.activeBand = {id: '13'} as Band;
      service.user = {id: '12'} as User;
    });
    test('should call router.navigate on succes', () => {
      service.leaveBand();
      const request = http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + service.activeBand.id + '/users/' + service.user.id &&
        req.method === 'DELETE');
      request.flush({});
      expect(router.navigate).toBeCalled();
    });

    test('should call hadnleError on error', () => {
      service.leaveBand();
      const request = http.expectOne(req =>
        req.url === AppSettings.apiUrl + 'bands/' + service.activeBand.id + '/users/' + service.user.id &&
        req.method === 'DELETE');
      request.error(new ErrorEvent('error'));
      expect(errorService.handleError).toBeCalled();
    });
  });

});
