import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistoricoConciliacionComponent } from './tabla-historico-conciliacion.component';

describe('TablaHistoricoConciliacionComponent', () => {
  let component: TablaHistoricoConciliacionComponent;
  let fixture: ComponentFixture<TablaHistoricoConciliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaHistoricoConciliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHistoricoConciliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
