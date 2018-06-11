import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';

@Component({
  selector: 'app-view-unidade-medida',
  templateUrl: './view-unidade-medida.component.html',
  styleUrls: ['./view-unidade-medida.component.css']
})
export class ViewUnidadeMedidaComponent implements OnInit {
  unidadeMedidaId: any;
  unidadeMedida: any;

  constructor(
    private unidadeMedidaService : UnidadeMedidaService,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService) { 
      route.params.subscribe(p => {
        this.unidadeMedidaId = +p['id'];
        if (isNaN(this.unidadeMedidaId) || this.unidadeMedidaId <= 0) {
          router.navigate(['/unidadeMedida']);
          return; 
        }
      });
     }

  ngOnInit() {
    this.unidadeMedidaService.getUnidadeMedida(this.unidadeMedidaId)
      .subscribe(
        data => this.unidadeMedida = data,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/unidadeMedida']);
            return; 
          }
        });
  }

  delete(){
    if (confirm("Are you sure?")) {
      this.unidadeMedidaService.delete(this.unidadeMedida.id)
        .subscribe(x => {
          this.toasty.warning({
            title: 'Sucesso', 
            msg: 'Unidade de medida deletada com sucesso.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 2000
          });
          this.router.navigate(['/unidadeMedida']);
        });
    }
  }

}
