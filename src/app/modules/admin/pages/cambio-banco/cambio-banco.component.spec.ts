import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioBancoComponent } from './cambio-banco.component';

describe('CambioBancoComponent', () => {
  let component: CambioBancoComponent;
  let fixture: ComponentFixture<CambioBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
