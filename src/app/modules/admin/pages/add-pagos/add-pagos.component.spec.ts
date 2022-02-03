import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagosComponent } from './add-pagos.component';

describe('AddPagosComponent', () => {
  let component: AddPagosComponent;
  let fixture: ComponentFixture<AddPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
