import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevArchivoComponent } from './prev-archivo.component';

describe('PrevArchivoComponent', () => {
  let component: PrevArchivoComponent;
  let fixture: ComponentFixture<PrevArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
