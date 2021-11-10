import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizarArchivoComponent } from './previsualizar-archivo.component';

describe('PrevisualizarArchivoComponent', () => {
  let component: PrevisualizarArchivoComponent;
  let fixture: ComponentFixture<PrevisualizarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
