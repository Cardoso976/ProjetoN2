import { Component, OnInit } from '@angular/core';
import { ClienteService } from './../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any;
  columns = [
    {title: 'Nome'},
    //{title: 'Razão Social'},
    {title: 'Número Documento'},
    {title: 'Tipo Pessoa'},
    {title: 'Telefone'},
    { }
  ];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data
      console.log(this.clientes);
    });
  }

}
