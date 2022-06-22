import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPruebaComponent } from './validar-prueba.component';

describe('ValidarPruebaComponent', () => {
  let component: ValidarPruebaComponent;
  let fixture: ComponentFixture<ValidarPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
