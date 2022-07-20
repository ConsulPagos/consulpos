import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPruebaCorrectivoComponent } from './tabla-prueba-correctivo.component';

describe('TablaPruebaCorrectivoComponent', () => {
  let component: TablaPruebaCorrectivoComponent;
  let fixture: ComponentFixture<TablaPruebaCorrectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPruebaCorrectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPruebaCorrectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
