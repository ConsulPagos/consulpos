import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCambioSimComponent } from './add-cambio-sim.component';

describe('AddCambioSimComponent', () => {
  let component: AddCambioSimComponent;
  let fixture: ComponentFixture<AddCambioSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCambioSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCambioSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
