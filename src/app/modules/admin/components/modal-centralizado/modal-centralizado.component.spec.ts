import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCentralizadoComponent } from './modal-centralizado.component';

describe('ModalCentralizadoComponent', () => {
  let component: ModalCentralizadoComponent;
  let fixture: ComponentFixture<ModalCentralizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCentralizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCentralizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
