import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvedoresComponent } from './edit-provedores.component';

describe('EditProvedoresComponent', () => {
  let component: EditProvedoresComponent;
  let fixture: ComponentFixture<EditProvedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProvedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
