import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPruebaFichaComponent } from './validar-prueba-ficha.component';

describe('ValidarPruebaFichaComponent', () => {
  let component: ValidarPruebaFichaComponent;
  let fixture: ComponentFixture<ValidarPruebaFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPruebaFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPruebaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
