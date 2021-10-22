import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarDescuentoComponent } from './aplicar-descuento.component';

describe('AplicarDescuentoComponent', () => {
  let component: AplicarDescuentoComponent;
  let fixture: ComponentFixture<AplicarDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicarDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
