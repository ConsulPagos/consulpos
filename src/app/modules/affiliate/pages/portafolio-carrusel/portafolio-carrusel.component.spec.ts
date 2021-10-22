import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioCarruselComponent } from './portafolio-carrusel.component';

describe('PortafolioCarruselComponent', () => {
  let component: PortafolioCarruselComponent;
  let fixture: ComponentFixture<PortafolioCarruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortafolioCarruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
