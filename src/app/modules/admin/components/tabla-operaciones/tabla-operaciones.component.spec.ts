import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOperacionesComponent } from './tabla-operaciones.component';

describe('TablaOperacionesComponent', () => {
  let component: TablaOperacionesComponent;
  let fixture: ComponentFixture<TablaOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
