import { VendaService } from './../../../services/venda.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {
  vendas: any[] = [];
  columns = [
    {title: 'Produto'},
    {title: 'Cliente'},
    {title: 'Data Compra'},
    {title: 'Quantidade'},
    { }
  ];
  constructor(private vendaService: VendaService) { }

  ngOnInit() {
    this.vendaService.getVendas()
      .subscribe(data => this.vendas = data);
  }

}
