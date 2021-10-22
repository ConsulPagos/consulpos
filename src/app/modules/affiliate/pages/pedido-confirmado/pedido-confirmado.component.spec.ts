import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoConfirmadoComponent } from './pedido-confirmado.component';

describe('PedidoConfirmadoComponent', () => {
  let component: PedidoConfirmadoComponent;
  let fixture: ComponentFixture<PedidoConfirmadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoConfirmadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
