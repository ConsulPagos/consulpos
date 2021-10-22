import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoNavbarComponent } from './afiliado-navbar.component';

describe('AfiliadoNavbarComponent', () => {
  let component: AfiliadoNavbarComponent;
  let fixture: ComponentFixture<AfiliadoNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
