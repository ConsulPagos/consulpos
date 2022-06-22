import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiferirCuotaComponent } from './modal-diferir-cuota.component';

describe('ModalDiferirCuotaComponent', () => {
  let component: ModalDiferirCuotaComponent;
  let fixture: ComponentFixture<ModalDiferirCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiferirCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiferirCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
