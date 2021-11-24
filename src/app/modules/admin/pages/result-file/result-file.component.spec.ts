import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFileComponent } from './result-file.component';

describe('ResultFileComponent', () => {
  let component: ResultFileComponent;
  let fixture: ComponentFixture<ResultFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
