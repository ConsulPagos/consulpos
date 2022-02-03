import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSaleComponent } from './ficha-sale.component';

describe('FichaSaleComponent', () => {
  let component: FichaSaleComponent;
  let fixture: ComponentFixture<FichaSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
