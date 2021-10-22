import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmDetalleComponent } from './crm-detalle.component';

describe('CrmDetalleComponent', () => {
  let component: CrmDetalleComponent;
  let fixture: ComponentFixture<CrmDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
