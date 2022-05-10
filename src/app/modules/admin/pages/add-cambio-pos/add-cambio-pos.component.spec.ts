import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCambioPosComponent } from './add-cambio-pos.component';

describe('AddCambioPosComponent', () => {
  let component: AddCambioPosComponent;
  let fixture: ComponentFixture<AddCambioPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCambioPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCambioPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
