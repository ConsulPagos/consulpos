import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioSimComponent } from './cambio-sim.component';

describe('CambioSimComponent', () => {
  let component: CambioSimComponent;
  let fixture: ComponentFixture<CambioSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
