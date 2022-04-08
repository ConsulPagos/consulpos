import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCambioBancoComponent } from './tabla-cambio-banco.component';

describe('TablaCambioBancoComponent', () => {
  let component: TablaCambioBancoComponent;
  let fixture: ComponentFixture<TablaCambioBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCambioBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCambioBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
