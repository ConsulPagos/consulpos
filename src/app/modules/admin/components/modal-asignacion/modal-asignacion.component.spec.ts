import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionComponent } from './modal-asignacion.component';

describe('ModalAsignacionComponent', () => {
  let component: ModalAsignacionComponent;
  let fixture: ComponentFixture<ModalAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
