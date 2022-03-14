import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvedoresComponent } from './add-provedores.component';

describe('AddProvedoresComponent', () => {
  let component: AddProvedoresComponent;
  let fixture: ComponentFixture<AddProvedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProvedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
