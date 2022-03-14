import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelosComponent } from './edit-modelos.component';

describe('EditModelosComponent', () => {
  let component: EditModelosComponent;
  let fixture: ComponentFixture<EditModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
