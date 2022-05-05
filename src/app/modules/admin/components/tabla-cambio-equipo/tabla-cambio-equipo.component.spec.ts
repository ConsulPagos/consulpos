import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCambioEquipoComponent } from './tabla-cambio-equipo.component';

describe('TablaCambioEquipoComponent', () => {
  let component: TablaCambioEquipoComponent;
  let fixture: ComponentFixture<TablaCambioEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCambioEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCambioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
