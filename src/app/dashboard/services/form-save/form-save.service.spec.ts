import { TestBed } from '@angular/core/testing';

import { FormSaveService } from './form-save.service';

describe('FormSaveService', () => {
  let service: FormSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
