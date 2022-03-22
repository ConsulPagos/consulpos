import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSucursalesComponent } from './tabla-sucursales.component';

describe('TablaSucursalesComponent', () => {
  let component: TablaSucursalesComponent;
  let fixture: ComponentFixture<TablaSucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSucursalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
