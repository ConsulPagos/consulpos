import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoManualComponent } from './pago-manual.component';

describe('PagoManualComponent', () => {
  let component: PagoManualComponent;
  let fixture: ComponentFixture<PagoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
