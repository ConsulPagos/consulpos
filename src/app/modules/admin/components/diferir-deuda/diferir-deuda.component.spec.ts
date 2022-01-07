import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiferirDeudaComponent } from './diferir-deuda.component';

describe('DiferirDeudaComponent', () => {
  let component: DiferirDeudaComponent;
  let fixture: ComponentFixture<DiferirDeudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiferirDeudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiferirDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
