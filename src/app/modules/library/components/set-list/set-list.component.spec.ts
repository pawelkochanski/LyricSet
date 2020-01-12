import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SetListComponent} from './set-list.component';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';

import {SetListItemComponent} from '../set-list-item/set-list-item.component';


describe('SetListComponent', () => {
  let component: SetListComponent;
  let fixture: ComponentFixture<SetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [SetListComponent, SetListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
