import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCobrosComponent } from './detalle-cobros.component';

describe('DetalleCobrosComponent', () => {
  let component: DetalleCobrosComponent;
  let fixture: ComponentFixture<DetalleCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
