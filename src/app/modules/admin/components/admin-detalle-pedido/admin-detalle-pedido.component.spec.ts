import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallePedidoComponent } from './admin-detalle-pedido.component';

describe('AdminDetallePedidoComponent', () => {
  let component: AdminDetallePedidoComponent;
  let fixture: ComponentFixture<AdminDetallePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDetallePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
