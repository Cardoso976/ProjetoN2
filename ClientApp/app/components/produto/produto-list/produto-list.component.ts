import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: any[] = [];
  totProdutos: any = {
    valor: 0
  };
  mediaProdutos: any = {
    valor: 0
  };
  columns = [
    {title: 'Nome'},
    {title: 'Código'},
    {title: 'Quant Estoque'},
    { }
  ];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getProdutos()
      .subscribe(data => this.produtos = data);
    this.produtoService.getValorMediaProdutos()
      .subscribe(data => this.mediaProdutos = data);
    this.produtoService.getValorTotalProdutos()
      .subscribe(data => this.totProdutos = data);
  }

}
