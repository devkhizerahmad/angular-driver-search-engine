import { TestBed } from '@angular/core/testing';

import { DeletelenguageService } from './deletelenguage.service';

describe('DeletelenguageService', () => {
  let service: DeletelenguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletelenguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
