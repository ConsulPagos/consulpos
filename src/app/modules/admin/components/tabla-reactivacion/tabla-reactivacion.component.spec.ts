import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReactivacionComponent } from './tabla-reactivacion.component';

describe('TablaReactivacionComponent', () => {
  let component: TablaReactivacionComponent;
  let fixture: ComponentFixture<TablaReactivacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaReactivacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReactivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
