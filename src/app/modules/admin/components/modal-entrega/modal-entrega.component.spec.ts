import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntregaComponent } from './modal-entrega.component';

describe('ModalEntregaComponent', () => {
  let component: ModalEntregaComponent;
  let fixture: ComponentFixture<ModalEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
