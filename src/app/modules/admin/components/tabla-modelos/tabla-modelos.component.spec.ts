import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModelosComponent } from './tabla-modelos.component';

describe('TablaModelosComponent', () => {
  let component: TablaModelosComponent;
  let fixture: ComponentFixture<TablaModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
