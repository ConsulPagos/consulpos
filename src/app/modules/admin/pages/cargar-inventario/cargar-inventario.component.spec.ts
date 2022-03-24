import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarInventarioComponent } from './cargar-inventario.component';

describe('CargarInventarioComponent', () => {
  let component: CargarInventarioComponent;
  let fixture: ComponentFixture<CargarInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
