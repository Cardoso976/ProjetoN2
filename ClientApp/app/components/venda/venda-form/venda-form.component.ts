import { venda, vendaSalvar } from './../../../models/venda';
import { Observable } from 'rxjs/Observable';
import { VendaService } from './../../../services/venda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../../services/cliente.service';
import { ProdutoService } from './../../../services/produto.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {
  now: Date = new Date();
  dataCompra : any;
  produtos: any [] = [];
  clientes: any [] = [];
  venda: vendaSalvar = {
    produtoId: 0,
    clienteId: 0,
    quantidadeProduto: 0
  };

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private toastyService: ToastyService
  ) {
      this.dataCompra = new Date().toLocaleString();
   }

  ngOnInit() {
    var sources = [
      this.produtoService.getProdutos(),
      this.clienteService.getClientes()
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.produtos = data[0];
      this.clientes = data[1];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  submit(){
    this.vendaService.create(this.venda).subscribe(venda => {
      this.toastyService.success({
        title: 'Sucesso', 
        msg: 'Venda adicionada com sucesso.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
      this.router.navigate(['/vendas']);
    });
  }

}
