import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanesComponent } from './add-planes.component';

describe('AddPlanesComponent', () => {
  let component: AddPlanesComponent;
  let fixture: ComponentFixture<AddPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
