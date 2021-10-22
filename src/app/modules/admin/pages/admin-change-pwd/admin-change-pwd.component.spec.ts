import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePwdComponent } from './admin-change-pwd.component';

describe('AdminChangePwdComponent', () => {
  let component: AdminChangePwdComponent;
  let fixture: ComponentFixture<AdminChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
