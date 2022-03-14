import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlataformasComponent } from './add-plataformas.component';

describe('AddPlataformasComponent', () => {
  let component: AddPlataformasComponent;
  let fixture: ComponentFixture<AddPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlataformasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
