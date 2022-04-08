import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposAsociadosComponent } from './equipos-asociados.component';

describe('EquiposAsociadosComponent', () => {
  let component: EquiposAsociadosComponent;
  let fixture: ComponentFixture<EquiposAsociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposAsociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
