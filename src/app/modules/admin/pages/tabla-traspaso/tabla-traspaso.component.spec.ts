import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTraspasoComponent } from './tabla-traspaso.component';

describe('TablaTraspasoComponent', () => {
  let component: TablaTraspasoComponent;
  let fixture: ComponentFixture<TablaTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
