import { TestBed } from '@angular/core/testing';

import { AmcServiceService } from './amc-service.service';

describe('AmcServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmcServiceService = TestBed.get(AmcServiceService);
    expect(service).toBeTruthy();
  });
});
