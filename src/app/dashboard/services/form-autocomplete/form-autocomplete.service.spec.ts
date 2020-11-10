import { TestBed } from '@angular/core/testing';

import { FormAutocompleteService } from './form-autocomplete.service';

describe('FormAutocompleteService', () => {
  let service: FormAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
