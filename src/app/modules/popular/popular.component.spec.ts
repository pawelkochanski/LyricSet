import {PopularComponent} from './popular.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RatingModule} from 'ng-starrating';
import {RouterTestingModule} from '@angular/router/testing';
import {MysetsService} from '../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../core/services/mysets.service.spec.stub';
import {ErrorService} from '../../core/services/error.service';
import {Test} from 'tslint';
import {of} from 'rxjs';
import {Lyrics} from '../../shared/interfaces/lyrics';
import {LyricSet} from '../../shared/interfaces/lyric-set';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  template: ''
})
class DummyComponent {

}

describe('PopularComponent', () => {
  let component: PopularComponent;
  let fixture: ComponentFixture<PopularComponent>;
  let setService: MysetsService;
  let errorService: ErrorService;
  let location: Location;

  const topSets = [{id: 'fakeId', ownerId: 'fakeId', imageId: 'fakeId', rating: 3}] as LyricSet[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularComponent, DummyComponent],
      imports: [AngularMaterialModule, RatingModule, RouterTestingModule.withRoutes([
        {path: 'user/:id/:setid', component: DummyComponent},
        {path: 'song/:id/', component: DummyComponent}
      ])],
      providers: [
        {provide: MysetsService, useClass: MysetsServiceSpecStub},
        {
          provide: ErrorService, useClass: class {
            handleError = jest.fn();
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularComponent);
    component = fixture.componentInstance;
    setService = TestBed.get(MysetsService);
    errorService = TestBed.get(ErrorService);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  test('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  describe('init', () => {
    test('should call getTopSets', () => {
      const spy = jest.spyOn(setService, 'getTopSets')
        .mockReturnValue(of(topSets));
      const spy2 = jest.spyOn(setService, 'getTopSongs');
      component.ngOnInit();
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
      expect(component.topSets).toEqual((topSets));
    });
  });

});
