import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarInventarioSimComponent } from './cargar-inventario-sim.component';

describe('CargarInventarioSimComponent', () => {
  let component: CargarInventarioSimComponent;
  let fixture: ComponentFixture<CargarInventarioSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarInventarioSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarInventarioSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
