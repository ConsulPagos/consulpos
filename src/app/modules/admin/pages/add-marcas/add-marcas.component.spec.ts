import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarcasComponent } from './add-marcas.component';

describe('AddMarcasComponent', () => {
  let component: AddMarcasComponent;
  let fixture: ComponentFixture<AddMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
