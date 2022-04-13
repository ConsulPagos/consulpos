import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionManualComponent } from './modal-asignacion-manual.component';

describe('ModalAsignacionManualComponent', () => {
  let component: ModalAsignacionManualComponent;
  let fixture: ComponentFixture<ModalAsignacionManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignacionManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignacionManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
