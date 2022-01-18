import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroCentralizadoComponent } from './cobro-centralizado.component';

describe('CobroCentralizadoComponent', () => {
  let component: CobroCentralizadoComponent;
  let fixture: ComponentFixture<CobroCentralizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobroCentralizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroCentralizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
