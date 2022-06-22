import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionPruebaComponent } from './modal-asignacion-prueba.component';

describe('ModalAsignacionPruebaComponent', () => {
  let component: ModalAsignacionPruebaComponent;
  let fixture: ComponentFixture<ModalAsignacionPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignacionPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignacionPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
