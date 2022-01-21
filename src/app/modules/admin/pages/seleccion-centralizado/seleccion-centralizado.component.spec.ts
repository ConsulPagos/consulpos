import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCentralizadoComponent } from './seleccion-centralizado.component';

describe('SeleccionCentralizadoComponent', () => {
  let component: SeleccionCentralizadoComponent;
  let fixture: ComponentFixture<SeleccionCentralizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionCentralizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionCentralizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
