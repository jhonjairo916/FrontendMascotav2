import { TestBed } from '@angular/core/testing';

import { VerificadorNosesionGuard } from './verificador-nosesion.guard';

describe('VerificadorNosesionGuard', () => {
  let guard: VerificadorNosesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificadorNosesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
