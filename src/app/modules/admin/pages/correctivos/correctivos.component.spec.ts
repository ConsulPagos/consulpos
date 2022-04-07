import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectivosComponent } from './correctivos.component';

describe('CorrectivosComponent', () => {
  let component: CorrectivosComponent;
  let fixture: ComponentFixture<CorrectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
