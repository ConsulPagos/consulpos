import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCorrectivoComponent } from './prueba-correctivo.component';

describe('PruebaCorrectivoComponent', () => {
  let component: PruebaCorrectivoComponent;
  let fixture: ComponentFixture<PruebaCorrectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaCorrectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCorrectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
