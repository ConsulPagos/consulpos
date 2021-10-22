import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCobrosComponent } from './historial-cobros.component';

describe('HistorialCobrosComponent', () => {
  let component: HistorialCobrosComponent;
  let fixture: ComponentFixture<HistorialCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
