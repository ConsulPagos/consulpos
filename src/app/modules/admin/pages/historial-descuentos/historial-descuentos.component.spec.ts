import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDescuentosComponent } from './historial-descuentos.component';

describe('HistorialDescuentosComponent', () => {
  let component: HistorialDescuentosComponent;
  let fixture: ComponentFixture<HistorialDescuentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDescuentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
