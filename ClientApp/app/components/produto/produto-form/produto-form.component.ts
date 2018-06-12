import { ProdutoService } from './../../../services/produto.service';
import { produto } from './../../../models/produto';
import { ToastyService } from 'ng2-toasty';
import { MarcaService } from './../../../services/marca.service';
import { UnidadeMedidaService } from './../../../services/unidade-medida.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  marcas: any[] = [];
  unidadeMedidas: any[] = [];
  produto: produto = {
    id: 0,
    codigo: '',
    nome: '',
    precoCusto: 0,
    precoVenda: 0,
    quantEstoque: 0,
    unidadeMedidaId: 0,
    marcaId: 0
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private marcaService: MarcaService,
    private toastyService: ToastyService) { 

      route.params.subscribe(p => {
        this.produto.id = +p['id'] || 0;
      });
     }

  ngOnInit() {    
    var sources = [
      this.unidadeMedidaService.getUnidadeMedidas(),
      this.marcaService.getMarcas(),
    ];

    if (this.produto.id)
      sources.push(this.produtoService.getProduto(this.produto.id));

    Observable.forkJoin(sources).subscribe(data => {
      this.unidadeMedidas = data[0];
      this.marcas = data[1];

      if (this.produto.id) {
        this.setProduto(data[2]);
      }

      console.log(this.marcas, this.unidadeMedidas);
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setProduto(p: produto){
    this.produto.id = p.id,
    this.produto.codigo = p.codigo,
    this.produto.nome = p.nome,
    this.produto.precoCusto = p.precoCusto,
    this.produto.precoVenda = p.precoVenda,
    this.produto.quantEstoque = p.quantEstoque,
    this.produto.unidadeMedidaId = p.unidadeMedidaId,
    this.produto.marcaId = p.marcaId
  }

  submit(){
    var result$ = (this.produto.id) ? this.produtoService.update(this.produto.id, this.produto) : this.produtoService.create(this.produto); 
    result$.subscribe(produto => {
      this.toastyService.success({
        title: 'Sucesso', 
        msg: 'Produto adicionada com sucesso.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
      this.router.navigate(['/produtos']);
    });
  }

}
