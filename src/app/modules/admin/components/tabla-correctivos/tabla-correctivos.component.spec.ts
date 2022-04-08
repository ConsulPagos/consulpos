import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCorrectivosComponent } from './tabla-correctivos.component';

describe('TablaCorrectivosComponent', () => {
  let component: TablaCorrectivosComponent;
  let fixture: ComponentFixture<TablaCorrectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCorrectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCorrectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
