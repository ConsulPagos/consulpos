import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarArchivoComponent } from './actualizar-archivo.component';

describe('ActualizarArchivoComponent', () => {
  let component: ActualizarArchivoComponent;
  let fixture: ComponentFixture<ActualizarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
