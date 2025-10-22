import { TestBed } from '@angular/core/testing';

import { DriverdataService } from './driverdata.service';

describe('DriverdataService', () => {
  let service: DriverdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
