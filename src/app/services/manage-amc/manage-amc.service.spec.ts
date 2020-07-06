import { TestBed } from '@angular/core/testing';

import { ManageAmcService } from './manage-amc.service';

describe('ManageAmcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAmcService = TestBed.get(ManageAmcService);
    expect(service).toBeTruthy();
  });
});
