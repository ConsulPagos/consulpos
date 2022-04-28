import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPosComponent } from './cambio-pos.component';

describe('CambioPosComponent', () => {
  let component: CambioPosComponent;
  let fixture: ComponentFixture<CambioPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
