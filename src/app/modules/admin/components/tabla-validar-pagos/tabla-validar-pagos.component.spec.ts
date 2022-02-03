import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaValidarPagosComponent } from './tabla-validar-pagos.component';

describe('TablaValidarPagosComponent', () => {
  let component: TablaValidarPagosComponent;
  let fixture: ComponentFixture<TablaValidarPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaValidarPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaValidarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
