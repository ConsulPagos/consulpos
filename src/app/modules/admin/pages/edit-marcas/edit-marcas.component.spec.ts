import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarcasComponent } from './edit-marcas.component';

describe('EditMarcasComponent', () => {
  let component: EditMarcasComponent;
  let fixture: ComponentFixture<EditMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
