import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPagoManualComponent } from './tabla-pago-manual.component';

describe('TablaPagoManualComponent', () => {
  let component: TablaPagoManualComponent;
  let fixture: ComponentFixture<TablaPagoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPagoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPagoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
