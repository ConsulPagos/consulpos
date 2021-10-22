import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarritoComponent } from './admin-carrito.component';

describe('AdminCarritoComponent', () => {
  let component: AdminCarritoComponent;
  let fixture: ComponentFixture<AdminCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
