import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverInventarioComponent } from './mover-inventario.component';

describe('MoverInventarioComponent', () => {
  let component: MoverInventarioComponent;
  let fixture: ComponentFixture<MoverInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoverInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
