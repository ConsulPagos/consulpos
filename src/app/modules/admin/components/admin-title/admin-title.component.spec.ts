import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTitleComponent } from './admin-title.component';

describe('AdminTitleComponent', () => {
  let component: AdminTitleComponent;
  let fixture: ComponentFixture<AdminTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
