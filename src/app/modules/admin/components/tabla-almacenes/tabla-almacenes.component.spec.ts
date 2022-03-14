import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAlmacenesComponent } from './tabla-almacenes.component';

describe('TablaAlmacenesComponent', () => {
  let component: TablaAlmacenesComponent;
  let fixture: ComponentFixture<TablaAlmacenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAlmacenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
