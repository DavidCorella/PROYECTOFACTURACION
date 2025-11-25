import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasForm } from './facturas-form';

describe('FacturasForm', () => {
  let component: FacturasForm;
  let fixture: ComponentFixture<FacturasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
