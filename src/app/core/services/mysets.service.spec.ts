import { TestBed } from '@angular/core/testing';

import { MysetsService } from './mysets.service';

describe('MysetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MysetsService = TestBed.get(MysetsService);
    expect(service).toBeTruthy();
  });
});
