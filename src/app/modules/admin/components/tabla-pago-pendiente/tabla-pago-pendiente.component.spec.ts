import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPagoPendienteComponent } from './tabla-pago-pendiente.component';

describe('TablaPagoPendienteComponent', () => {
  let component: TablaPagoPendienteComponent;
  let fixture: ComponentFixture<TablaPagoPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPagoPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPagoPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
