import { TestBed } from '@angular/core/testing';

import { UnidadtransitoService } from './unidadtransito.service';

describe('UnidadtransitoService', () => {
  let service: UnidadtransitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadtransitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
