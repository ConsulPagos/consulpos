import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCobrosComponent } from './tabla-cobros.component';

describe('TablaCobrosComponent', () => {
  let component: TablaCobrosComponent;
  let fixture: ComponentFixture<TablaCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
