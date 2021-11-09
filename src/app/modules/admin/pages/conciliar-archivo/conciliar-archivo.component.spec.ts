import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliarArchivoComponent } from './conciliar-archivo.component';

describe('ConciliarArchivoComponent', () => {
  let component: ConciliarArchivoComponent;
  let fixture: ComponentFixture<ConciliarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
