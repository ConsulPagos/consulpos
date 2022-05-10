import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesinstalacionComponent } from './desinstalacion.component';

describe('DesinstalacionComponent', () => {
  let component: DesinstalacionComponent;
  let fixture: ComponentFixture<DesinstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesinstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesinstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
