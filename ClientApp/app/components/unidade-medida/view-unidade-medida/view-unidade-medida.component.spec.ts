import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnidadeMedidaComponent } from './view-unidade-medida.component';

describe('ViewUnidadeMedidaComponent', () => {
  let component: ViewUnidadeMedidaComponent;
  let fixture: ComponentFixture<ViewUnidadeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnidadeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnidadeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
