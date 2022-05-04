import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReactivacionComponent } from './add-reactivacion.component';

describe('AddReactivacionComponent', () => {
  let component: AddReactivacionComponent;
  let fixture: ComponentFixture<AddReactivacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReactivacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReactivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
