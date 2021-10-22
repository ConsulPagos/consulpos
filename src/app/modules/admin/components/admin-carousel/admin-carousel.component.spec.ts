import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarouselComponent } from './admin-carousel.component';

describe('AdminCarouselComponent', () => {
  let component: AdminCarouselComponent;
  let fixture: ComponentFixture<AdminCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
