import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKeySoComponent } from './modal-key-so.component';

describe('ModalKeySoComponent', () => {
  let component: ModalKeySoComponent;
  let fixture: ComponentFixture<ModalKeySoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKeySoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKeySoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
