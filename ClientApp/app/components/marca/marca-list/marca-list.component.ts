import { marca } from './../../../models/marca';
import { MarcaService } from './../../../services/marca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {
  marcas : marca [] = [];
  columns = [
    {title: 'Nome'},
    {title: 'Ativo'},
    { }
  ];

  constructor(private marcaService : MarcaService) { }

  ngOnInit() {
    this.marcaService.getMarcas()
      .subscribe(marcas => this.marcas = marcas);
  }

}
