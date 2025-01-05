import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoIdoneoComponent } from './candidato-idoneo.component';

describe('CandidatoIdoneoComponent', () => {
  let component: CandidatoIdoneoComponent;
  let fixture: ComponentFixture<CandidatoIdoneoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatoIdoneoComponent]
    });
    fixture = TestBed.createComponent(CandidatoIdoneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
