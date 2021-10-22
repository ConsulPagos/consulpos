import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaManualComponent } from './venta-manual.component';

describe('VentaManualComponent', () => {
  let component: VentaManualComponent;
  let fixture: ComponentFixture<VentaManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
