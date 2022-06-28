import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCambioEquipoComponent } from './ficha-cambio-equipo.component';

describe('FichaCambioEquipoComponent', () => {
  let component: FichaCambioEquipoComponent;
  let fixture: ComponentFixture<FichaCambioEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaCambioEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaCambioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
