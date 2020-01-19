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
});
