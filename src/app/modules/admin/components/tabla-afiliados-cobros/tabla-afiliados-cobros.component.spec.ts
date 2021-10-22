import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAfiliadosCobrosComponent } from './tabla-afiliados-cobros.component';

describe('TablaAfiliadosCobrosComponent', () => {
  let component: TablaAfiliadosCobrosComponent;
  let fixture: ComponentFixture<TablaAfiliadosCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAfiliadosCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAfiliadosCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
