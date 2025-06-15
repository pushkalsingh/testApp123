import { TestBed } from '@angular/core/testing';

import { NumberUpdate } from './number-update';

describe('NumberUpdate', () => {
  let service: NumberUpdate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberUpdate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
