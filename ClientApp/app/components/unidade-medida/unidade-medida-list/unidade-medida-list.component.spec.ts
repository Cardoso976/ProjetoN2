import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaListComponent } from './unidade-medida-list.component';

describe('UnidadeMedidaListComponent', () => {
  let component: UnidadeMedidaListComponent;
  let fixture: ComponentFixture<UnidadeMedidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeMedidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMedidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
