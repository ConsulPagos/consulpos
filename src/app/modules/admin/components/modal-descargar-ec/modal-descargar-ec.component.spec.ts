import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescargarEcComponent } from './modal-descargar-ec.component';

describe('ModalDescargarEcComponent', () => {
  let component: ModalDescargarEcComponent;
  let fixture: ComponentFixture<ModalDescargarEcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDescargarEcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDescargarEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
