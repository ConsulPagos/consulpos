import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAfiliadosCrmComponent } from './tabla-afiliados-crm.component';

describe('TablaAfiliadosCrmComponent', () => {
  let component: TablaAfiliadosCrmComponent;
  let fixture: ComponentFixture<TablaAfiliadosCrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAfiliadosCrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAfiliadosCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
