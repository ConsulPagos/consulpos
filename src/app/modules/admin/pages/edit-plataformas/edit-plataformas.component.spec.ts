import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlataformasComponent } from './edit-plataformas.component';

describe('EditPlataformasComponent', () => {
  let component: EditPlataformasComponent;
  let fixture: ComponentFixture<EditPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlataformasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
