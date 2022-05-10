import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCambioSimComponent } from './tabla-cambio-sim.component';

describe('TablaCambioSimComponent', () => {
  let component: TablaCambioSimComponent;
  let fixture: ComponentFixture<TablaCambioSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCambioSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCambioSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
