import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorVentaComponent } from './validador-venta.component';

describe('ValidadorVentaComponent', () => {
  let component: ValidadorVentaComponent;
  let fixture: ComponentFixture<ValidadorVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidadorVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidadorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
