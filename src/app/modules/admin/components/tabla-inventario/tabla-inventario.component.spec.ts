import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInventarioComponent } from './tabla-inventario.component';

describe('TablaInventarioComponent', () => {
  let component: TablaInventarioComponent;
  let fixture: ComponentFixture<TablaInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
