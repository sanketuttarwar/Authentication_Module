import { TestBed } from '@angular/core/testing';

import { AssociateGuard } from './associate.guard';

describe('AssociateGuard', () => {
  let guard: AssociateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssociateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
