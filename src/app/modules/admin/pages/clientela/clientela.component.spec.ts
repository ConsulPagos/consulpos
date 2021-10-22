import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientelaComponent } from './clientela.component';

describe('ClientelaComponent', () => {
  let component: ClientelaComponent;
  let fixture: ComponentFixture<ClientelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
