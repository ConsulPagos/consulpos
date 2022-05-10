import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDesinstalacionComponent } from './tabla-desinstalacion.component';

describe('TablaDesinstalacionComponent', () => {
  let component: TablaDesinstalacionComponent;
  let fixture: ComponentFixture<TablaDesinstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaDesinstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDesinstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
