import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HagaSuPedidoDialogComponent } from './haga-su-pedido-dialog.component';

describe('HagaSuPedidoDialogComponent', () => {
  let component: HagaSuPedidoDialogComponent;
  let fixture: ComponentFixture<HagaSuPedidoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HagaSuPedidoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HagaSuPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
