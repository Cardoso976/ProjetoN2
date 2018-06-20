import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-list-vencidos',
  templateUrl: './produto-list-vencidos.component.html',
  styleUrls: ['./produto-list-vencidos.component.css']
})
export class ProdutoListVencidosComponent implements OnInit {
  produtosVencidos: any[] = [];
  valor: any = {
    valor: 0
  };
  columns = [
    {title: 'Nome'},
    {title: 'Código'},
    {title: 'Quant Perdida'},
    {title: 'Validade'}
  ];

   constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getProdutosVencidos()
      .subscribe(data => this.produtosVencidos = data);

      this.produtoService.getValorPerdidoVencidos()
      .subscribe(val => this.valor = val);
  }
}
