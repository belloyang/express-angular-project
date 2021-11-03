import { TestBed } from '@angular/core/testing';

import { HarvesterApiService } from './harvester-api.service';

describe('HarvesterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HarvesterApiService = TestBed.get(HarvesterApiService);
    expect(service).toBeTruthy();
  });
});
