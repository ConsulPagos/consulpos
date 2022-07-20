import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlanesComponent } from './tabla-planes.component';

describe('TablaPlanesComponent', () => {
  let component: TablaPlanesComponent;
  let fixture: ComponentFixture<TablaPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
