import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfiguracionManualComponent } from './modal-configuracion-manual.component';

describe('ModalConfiguracionManualComponent', () => {
  let component: ModalConfiguracionManualComponent;
  let fixture: ComponentFixture<ModalConfiguracionManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfiguracionManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfiguracionManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
