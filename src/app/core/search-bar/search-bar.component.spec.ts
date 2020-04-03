import {SearchComponent} from '../../modules/search/search.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MysetsService} from '../services/mysets.service';
import {ErrorService} from '../services/error.service';
import {Router} from '@angular/router';
import {SearchBarComponent} from './search-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularJSUrlCodec} from '@angular/common/upgrade';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {of} from 'rxjs';
import {MysetsServiceSpecStub} from '../services/mysets.service.spec.stub';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Track} from '../../shared/interfaces/track';
import {SearchBarResponse, TrackResponse} from '../../shared/interfaces/search-track-response';
import mock = jest.mock;
import {debounceTime} from 'rxjs/operators';
import {UserResponse} from '../../shared/interfaces/userResponse';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let setService: MysetsService;
  let errorService: ErrorService;
  let router: Router;

  const mockSearchResult = {
    byTitle: {
      track_list: [{
        track: {
          track_id: 1,
          track_name: 'name',
          artist_id: '1',
          artist_name: 'name'
        }
      }]
    },
    byArtist: {
      track_list: [{
        track: {
          track_id: 1,
          track_name: 'name',
          artist_id: '1',
          artist_name: 'name'
        }
      }]
    },
    users: [
      {
        displayname: 'display',
        bio: '',
        url: '',
        id: '',
        avatarId: ''
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
          }
        },
        {
          provide: MysetsService, useClass: MysetsServiceSpecStub
        },
        {
          provide: ErrorService, useClass: class {
            handleError = jest.fn();
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    setService = TestBed.get(MysetsService);
    errorService = TestBed.get(ErrorService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  test('should init with no result and search input null', () => {
    expect(component.searchFrom.controls.searchInput.value).toBeNull();
    expect(component.noResult).toBeFalsy();
    expect(component.isAutocomplete).toBeFalsy();
  });

  test('auto-complete should be dsiabled if not isAutocomplete', () => {
    const auto = fixture.debugElement.nativeElement.querySelector('.auto-complete');
    expect(auto).toBeNull();
  });
  describe('autocomplete', () => {
    beforeEach(() => {
      component.isAutocomplete = true;
      fixture.detectChanges();
    });

    test('auto-complete should be if  isAutocomplete', () => {
      const auto = fixture.debugElement.nativeElement.querySelector('.auto-complete');
      expect(auto).toBeTruthy();
    });

    test('loading should be if isLoading', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.nativeElement.querySelector('.spinner');
      expect(spinner).toBeTruthy();
    });

    test('no result should be if noResult and !isLoading', () => {
      component.isLoading = false;
      component.noResult = true;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('.no-result');
      expect(element).toBeTruthy();
    });

    test('search by title should be if serachResult and is tracklist', () => {
      component.searchResult = mockSearchResult;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement.querySelector('.label-by-title');
      expect(element).toBeTruthy();
    });
  });

  test('input value change should call handleValueCHange ', fakeAsync(() => {
    const spy = jest.spyOn(component, 'handleValueChange').mockImplementation();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    component.searchFrom.controls.searchInput.setValue('13');
    component.searchFrom.updateValueAndValidity({onlySelf: false, emitEvent: true});
    fixture.detectChanges();
    tick(600);
    expect(spy).toHaveBeenCalled();
  }));

  describe('handleValueChange', () => {
    test('should set searchResult on valid response', () => {
      jest.spyOn(setService, 'quickSearch').mockReturnValue(of(mockSearchResult));
      component.handleValueChange('13');
      expect(component.searchResult).toEqual(mockSearchResult);
    });
  });

  test('onSearchClick shouldn not navigate if input is null', () => {
    component.onSearchClick();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('onSearchClick shouldn  navigate if input is set', () => {
    component.searchFrom.controls.searchInput.setValue('13');
    component.onSearchClick();
    expect(router.navigate).toHaveBeenCalled();
  });

  test('onSongClick should navigate to song and set searchInput to track_name', () => {
    const track = {
      track_name: 'track_name',
      track_id: 17
    } as Track;
    component.onSongClick(track);
    expect(component.searchFrom.controls.searchInput.value).toEqual(track.track_name);
    expect(router.navigate).toHaveBeenCalled();
  });

  test('onUserClick should navigate to user and set input value to displayname', () => {
    const user = {
      displayname: 'displayname',
      id: '13'
    } as UserResponse;
    component.onUserClick(user);
    expect(component.searchFrom.controls.searchInput.value).toEqual(user.displayname);
    expect(router.navigate).toHaveBeenCalled();
  });

});
