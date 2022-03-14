import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlmacenesComponent } from './edit-almacenes.component';

describe('EditAlmacenesComponent', () => {
  let component: EditAlmacenesComponent;
  let fixture: ComponentFixture<EditAlmacenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlmacenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
