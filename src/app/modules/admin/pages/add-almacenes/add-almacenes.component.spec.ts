import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlmacenesComponent } from './add-almacenes.component';

describe('AddAlmacenesComponent', () => {
  let component: AddAlmacenesComponent;
  let fixture: ComponentFixture<AddAlmacenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlmacenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
