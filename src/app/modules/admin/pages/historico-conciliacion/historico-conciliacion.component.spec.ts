import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConciliacionComponent } from './historico-conciliacion.component';

describe('HistoricoConciliacionComponent', () => {
  let component: HistoricoConciliacionComponent;
  let fixture: ComponentFixture<HistoricoConciliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoConciliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConciliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
