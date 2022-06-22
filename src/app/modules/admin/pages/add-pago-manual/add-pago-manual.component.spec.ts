import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagoManualComponent } from './add-pago-manual.component';

describe('AddPagoManualComponent', () => {
  let component: AddPagoManualComponent;
  let fixture: ComponentFixture<AddPagoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPagoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPagoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
