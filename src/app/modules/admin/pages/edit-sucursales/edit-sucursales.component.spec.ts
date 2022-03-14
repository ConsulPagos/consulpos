import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSucursalesComponent } from './edit-sucursales.component';

describe('EditSucursalesComponent', () => {
  let component: EditSucursalesComponent;
  let fixture: ComponentFixture<EditSucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSucursalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
