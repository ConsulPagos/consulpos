import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSuperAdminComponent } from './tabla-super-admin.component';

describe('TablaSuperAdminComponent', () => {
  let component: TablaSuperAdminComponent;
  let fixture: ComponentFixture<TablaSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
