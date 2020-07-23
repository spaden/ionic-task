import { TestBed } from '@angular/core/testing';

import { ManagePmService } from './manage-pm.service';

describe('ManagePmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagePmService = TestBed.get(ManagePmService);
    expect(service).toBeTruthy();
  });
});
