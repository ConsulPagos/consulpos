import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaValidarPruebaComponent } from './tabla-validar-prueba.component';

describe('TablaValidarPruebaComponent', () => {
  let component: TablaValidarPruebaComponent;
  let fixture: ComponentFixture<TablaValidarPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaValidarPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaValidarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
