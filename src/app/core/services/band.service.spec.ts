import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';
import {BandService} from './band.service';
import {MysetsService} from './mysets.service';
import {of} from 'rxjs';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {User} from '../../shared/interfaces/user';
import {Roles} from '../../shared/enums/roles';
import {Member, MemberRoles} from '../../shared/interfaces/Band';

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
});
