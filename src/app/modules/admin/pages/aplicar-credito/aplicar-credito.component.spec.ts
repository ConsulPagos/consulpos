import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarCreditoComponent } from './aplicar-credito.component';

describe('AplicarCreditoComponent', () => {
  let component: AplicarCreditoComponent;
  let fixture: ComponentFixture<AplicarCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicarCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
