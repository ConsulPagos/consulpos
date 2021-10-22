import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientelaAfiliadosComponent } from './clientela-afiliados.component';

describe('ClientelaAfiliadosComponent', () => {
  let component: ClientelaAfiliadosComponent;
  let fixture: ComponentFixture<ClientelaAfiliadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientelaAfiliadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientelaAfiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
