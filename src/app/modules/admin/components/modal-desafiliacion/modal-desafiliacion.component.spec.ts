import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDesafiliacionComponent } from './modal-desafiliacion.component';

describe('ModalDesafiliacionComponent', () => {
  let component: ModalDesafiliacionComponent;
  let fixture: ComponentFixture<ModalDesafiliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDesafiliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDesafiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
