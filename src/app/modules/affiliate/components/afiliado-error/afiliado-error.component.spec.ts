import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoErrorComponent } from './afiliado-error.component';

describe('AfiliadoErrorComponent', () => {
  let component: AfiliadoErrorComponent;
  let fixture: ComponentFixture<AfiliadoErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
