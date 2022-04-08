import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraspasoComponent } from './add-traspaso.component';

describe('AddTraspasoComponent', () => {
  let component: AddTraspasoComponent;
  let fixture: ComponentFixture<AddTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
