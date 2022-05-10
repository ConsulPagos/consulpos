import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesinstalacionComponent } from './add-desinstalacion.component';

describe('AddDesinstalacionComponent', () => {
  let component: AddDesinstalacionComponent;
  let fixture: ComponentFixture<AddDesinstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesinstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesinstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
