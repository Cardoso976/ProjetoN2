import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-view-produto',
  templateUrl: './view-produto.component.html',
  styleUrls: ['./view-produto.component.css']
})
export class ViewProdutoComponent implements OnInit {
  produto : any;
  produtoId: number = 0;

  constructor(
    private produtoService : ProdutoService,
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService) { 
    route.params.subscribe(p => {
      this.produtoId = +p['id'];
      if (isNaN(this.produtoId) || this.produtoId <= 0) {
        router.navigate(['/produtos']);
        return; 
      }
    });
   }

   ngOnInit() {     
    this.produtoService.getProduto(this.produtoId)
      .subscribe(
        m => this.produto = m,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/produtos']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Tem certeza?")) {
      this.produtoService.delete(this.produto.id)
        .subscribe(x => {
          this.toasty.warning({
            title: 'Sucesso', 
            msg: 'Produto excluido!!.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 2000
          });
          this.router.navigate(['/produtos']);
        });
    }
  }

}
