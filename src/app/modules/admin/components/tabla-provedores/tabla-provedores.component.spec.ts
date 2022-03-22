import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProvedoresComponent } from './tabla-provedores.component';

describe('TablaProvedoresComponent', () => {
  let component: TablaProvedoresComponent;
  let fixture: ComponentFixture<TablaProvedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProvedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
