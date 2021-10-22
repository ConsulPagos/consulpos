import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelloComponent } from './sello.component';

describe('SelloComponent', () => {
  let component: SelloComponent;
  let fixture: ComponentFixture<SelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
