import { MarcaService } from './../../../services/marca.service';
import { UnidadeMedidaService } from './../../../services/unidade-medida.service';
import { Observable } from 'rxjs/Observable';
import { ProdutoService } from './../../../services/produto.service';
import { ClienteService } from './../../../services/cliente.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { VendaService } from './../../../services/venda.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-venda',
  templateUrl: './view-venda.component.html',
  styleUrls: ['./view-venda.component.css']
})
export class ViewVendaComponent implements OnInit {  
  clientes: any [] = [];
  produtos: any [] = [];
  marcas: any [] = [];
  unidadeMedidas: any [] = [];
  vendaId: number = 0;
  vendaProdutoId: number = 0;
  vendaClienteId: number = 0;
  venda: any;

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private marcaService: MarcaService,
    private vendaService: VendaService,
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService) { 

    route.params.subscribe(p => {
      this.vendaId = +p['id'];
      this.vendaClienteId = +p['clienteId'];      
      this.vendaProdutoId = +p['produtoId'];
      if ((isNaN(this.vendaId) || this.vendaId <= 0) && (isNaN(this.vendaClienteId) || this.vendaClienteId <= 0) && (isNaN(this.vendaProdutoId) || this.vendaProdutoId <= 0)) {
        router.navigate(['/vendas']);
        return; 
      }
    });    
  }

  ngOnInit() {     
    var sources = [
      this.clienteService.getClientes(),
      this.produtoService.getProdutos(),
      this.marcaService.getMarcas(),
      this.unidadeMedidaService.getUnidadeMedidas(),
    ];

    if (this.vendaId, this.vendaClienteId, this.vendaProdutoId)
      sources.push(this.vendaService.getVenda(this.vendaId, this.vendaClienteId, this.vendaProdutoId));

    Observable.forkJoin(sources).subscribe(data => {
      this.clientes = data[0];
      this.produtos = data[1];
      this.marcas = data[2];
      this.unidadeMedidas = data[3];

      if (this.vendaId, this.vendaClienteId, this.vendaProdutoId) {
        this.venda = data[4];
        this.populateModels();
        console.log(this.venda);
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private populateModels(){
    this.venda.cliente = this.clientes.find(c => c.id == this.venda.clienteId);
    this.venda.produto = this.produtos.find(p => p.id == this.venda.produtoId);
    this.venda.produto.unidadeMedida = this.unidadeMedidas.find(p => p.id == this.venda.produto.unidadeMedidaId);
    this.venda.produto.marca = this.marcas.find(m => m.id == this.venda.produto.marcaId);
  }

  delete() {
    if (confirm("Tem certeza?")) {
      this.vendaService.delete(this.venda.id, this.venda.clienteId, this.venda.produtoId)
        .subscribe(x => {
          this.toasty.warning({
            title: 'Concluido', 
            msg: 'Venda deletada com sucesso.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 2000
          });
          this.router.navigate(['/vendas']);
        });
    }
  }

}

// venda = {
//   id: 0,
//   produtoId: 0,
//   cliente: {     
//     id: 0,
//     nome: '',
//     razaoSocial: '',
//     numDocumento: '',
//     tipoPessoa: false,
//     telefone: '',
//     contato: '',
//     logradouro: '',
//     numero: '',
//     complemento: '',
//     cep: '',
//     pais: '',
//     estado: '',
//     cidade: '',      
// },
//   produto: {  
//     id: 0,
//     codigo: '',
//     nome: '',
//     precoCusto: 0,
//     precoVenda: 0,
//     quantEstoque: 0,
//     unidadeMedidaId: 0,
//     unidadeMedida: {
//       id: 0,
//       nome: '',
//       sigla: '',
//       ativo: false
//   },
//     marcaId: 0,
//     marca: {
//       id: 0,
//       nome: '',
//       ativo: false
//   },
// },
//   clienteId: 0,
//   precoPago: 0,
//   quantidadeProduto: 0,
//   dataCompra: ''
// };