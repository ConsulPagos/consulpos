import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTraspasoComponent } from './ficha-traspaso.component';

describe('FichaTraspasoComponent', () => {
  let component: FichaTraspasoComponent;
  let fixture: ComponentFixture<FichaTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
