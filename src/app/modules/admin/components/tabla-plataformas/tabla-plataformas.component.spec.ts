import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlataformasComponent } from './tabla-plataformas.component';

describe('TablaPlataformasComponent', () => {
  let component: TablaPlataformasComponent;
  let fixture: ComponentFixture<TablaPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPlataformasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
