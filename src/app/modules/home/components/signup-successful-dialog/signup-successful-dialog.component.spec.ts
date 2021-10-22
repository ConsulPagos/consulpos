import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessfulDialogComponent } from './signup-successful-dialog.component';

describe('SignupSuccessfulDialogComponent', () => {
  let component: SignupSuccessfulDialogComponent;
  let fixture: ComponentFixture<SignupSuccessfulDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSuccessfulDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
