import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCambioBancoComponent } from './add-cambio-banco.component';

describe('AddCambioBancoComponent', () => {
  let component: AddCambioBancoComponent;
  let fixture: ComponentFixture<AddCambioBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCambioBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCambioBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
