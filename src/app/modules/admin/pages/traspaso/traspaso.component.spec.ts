import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraspasoComponent } from './traspaso.component';

describe('TraspasoComponent', () => {
  let component: TraspasoComponent;
  let fixture: ComponentFixture<TraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
