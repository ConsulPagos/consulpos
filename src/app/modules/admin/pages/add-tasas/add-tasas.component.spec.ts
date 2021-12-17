import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTasasComponent } from './add-tasas.component';

describe('AddTasasComponent', () => {
  let component: AddTasasComponent;
  let fixture: ComponentFixture<AddTasasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTasasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
