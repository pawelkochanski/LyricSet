import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SetListItemComponent} from './set-list-item.component';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
describe('SetListItemComponent', () => {
  let component: SetListItemComponent;
  let fixture: ComponentFixture<SetListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [SetListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListItemComponent);
    component = fixture.componentInstance;
    component.set = {name: 'Test set', description: 'Description', image: '', tracklist: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
