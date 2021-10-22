import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCobroComponent } from './registrar-cobro.component';

describe('RegistrarCobroComponent', () => {
  let component: RegistrarCobroComponent;
  let fixture: ComponentFixture<RegistrarCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
