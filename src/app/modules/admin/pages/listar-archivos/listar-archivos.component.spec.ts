import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArchivosComponent } from './listar-archivos.component';

describe('ListarArchivosComponent', () => {
  let component: ListarArchivosComponent;
  let fixture: ComponentFixture<ListarArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
