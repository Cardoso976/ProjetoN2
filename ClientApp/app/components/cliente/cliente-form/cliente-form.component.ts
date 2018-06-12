import { cliente } from './../../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteId: any;
  cliente: cliente = {
    id: 0,
    nome: '',
    razaoSocial: '',
    numDocumento: '',
    tipoPessoa: false,
    telefone: '',
    contato: '',
    logradouro: '', 
    numero: '',
    complemento: '',
    cep: '',
    pais: '',
    estado: '',
    cidade: ''
  };

  constructor(
    private clienteService: ClienteService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router) { 
      route.params.subscribe(p => {
        this.clienteId = +p['id'] || 0;
      });
     }

  ngOnInit() {
    if(this.clienteId){
      this.clienteService.getCliente(this.clienteId).subscribe(data => {
        this.setCliente(data);
      },err => {
        if (err.status == 404)
          this.router.navigate(['/clientes']);
      });
    }
  }

  private setCliente(c: cliente){
    this.cliente.id= c.id;
    this.cliente.nome = c.nome; 
    this.cliente.razaoSocial = c.razaoSocial; 
    this.cliente.numDocumento = c.numDocumento; 
    this.cliente.tipoPessoa = c.tipoPessoa; 
    this.cliente.telefone = c.telefone; 
    this.cliente.contato = c.contato; 
    this.cliente.logradouro = c.logradouro; 
    this.cliente.numero = c.numero; 
    this.cliente.complemento = c.complemento; 
    this.cliente.cep = c.cep; 
    this.cliente.pais = c.pais; 
    this.cliente.estado = c.estado; 
    this.cliente.cidade = c.cidade; 
  }

  submit(){
    var result$ = (this.cliente.id) ? this.clienteService.update(this.cliente.id, this.cliente) : this.clienteService.create(this.cliente); 
    result$.subscribe(cliente => {
      this.toastyService.success({
        title: 'Sucesso', 
        msg: 'Cliente adicionado com sucesso.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
      this.router.navigate(['/clientes']);
    });
  }

}
