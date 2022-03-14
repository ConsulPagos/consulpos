import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelosComponent } from './add-modelos.component';

describe('AddModelosComponent', () => {
  let component: AddModelosComponent;
  let fixture: ComponentFixture<AddModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
