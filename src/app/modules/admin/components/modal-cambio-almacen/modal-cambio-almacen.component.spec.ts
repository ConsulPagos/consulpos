import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioAlmacenComponent } from './modal-cambio-almacen.component';

describe('ModalCambioAlmacenComponent', () => {
  let component: ModalCambioAlmacenComponent;
  let fixture: ComponentFixture<ModalCambioAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambioAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambioAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
