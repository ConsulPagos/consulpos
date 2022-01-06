import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditphoneComponent } from './editphone.component';

describe('EditphoneComponent', () => {
  let component: EditphoneComponent;
  let fixture: ComponentFixture<EditphoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditphoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
