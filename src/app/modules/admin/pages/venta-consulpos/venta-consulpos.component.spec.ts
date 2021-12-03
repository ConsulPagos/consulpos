import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaConsulposComponent } from './venta-consulpos.component';

describe('VentaConsulposComponent', () => {
  let component: VentaConsulposComponent;
  let fixture: ComponentFixture<VentaConsulposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaConsulposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaConsulposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
