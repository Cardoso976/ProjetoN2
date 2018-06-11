import { UnidadeMedidaService } from './../../../services/unidade-medida.service';
import { unidadeMedida } from './../../../models/unidade-medida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidade-medida-list',
  templateUrl: './unidade-medida-list.component.html',
  styleUrls: ['./unidade-medida-list.component.css']
})
export class UnidadeMedidaListComponent implements OnInit {
  unidadeMedidas : unidadeMedida [] = [];
  columns = [
    {title: 'Nome'},
    {title: 'Sigla'},
    {title: 'Ativo'},
    { }
  ];

  constructor(private unidadeMedidaService: UnidadeMedidaService) { }

  ngOnInit() {
    this.unidadeMedidaService.getUnidadeMedidas()
      .subscribe(datas => this.unidadeMedidas = datas);
  }

}
