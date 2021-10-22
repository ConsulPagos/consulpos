import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPedidoDialogComponent } from './confirm-pedido-dialog.component';

describe('ConfirmPedidoDialogComponent', () => {
  let component: ConfirmPedidoDialogComponent;
  let fixture: ComponentFixture<ConfirmPedidoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPedidoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
