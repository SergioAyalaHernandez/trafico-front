import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadtransitoComponent } from './unidadtransito.component';

describe('UnidadtransitoComponent', () => {
  let component: UnidadtransitoComponent;
  let fixture: ComponentFixture<UnidadtransitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadtransitoComponent]
    });
    fixture = TestBed.createComponent(UnidadtransitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
