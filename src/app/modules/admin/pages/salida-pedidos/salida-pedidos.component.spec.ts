import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaPedidosComponent } from './salida-pedidos.component';

describe('SalidaPedidosComponent', () => {
  let component: SalidaPedidosComponent;
  let fixture: ComponentFixture<SalidaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
