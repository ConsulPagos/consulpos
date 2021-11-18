import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarArchivoComponent } from './generar-archivo.component';

describe('RegistrarCobroComponent', () => {
  let component: GenerarArchivoComponent;
  let fixture: ComponentFixture<GenerarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
