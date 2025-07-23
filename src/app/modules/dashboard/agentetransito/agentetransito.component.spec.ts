import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentetransitoComponent } from './agentetransito.component';

describe('AgentetransitoComponent', () => {
  let component: AgentetransitoComponent;
  let fixture: ComponentFixture<AgentetransitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentetransitoComponent]
    });
    fixture = TestBed.createComponent(AgentetransitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
