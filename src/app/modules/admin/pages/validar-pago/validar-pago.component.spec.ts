import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPagoComponent } from './validar-pago.component';

describe('ValidarPagoComponent', () => {
  let component: ValidarPagoComponent;
  let fixture: ComponentFixture<ValidarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
