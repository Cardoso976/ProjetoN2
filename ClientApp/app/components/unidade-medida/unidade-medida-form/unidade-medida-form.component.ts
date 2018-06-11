import { unidadeMedida } from './../../../models/unidade-medida';
import { ToastyService } from 'ng2-toasty';
import { UnidadeMedidaService } from './../../../services/unidade-medida.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidade-medida-form',
  templateUrl: './unidade-medida-form.component.html',
  styleUrls: ['./unidade-medida-form.component.css']
})
export class UnidadeMedidaFormComponent implements OnInit {
  unidadeMedidaId: any;
  unidadeMedida : unidadeMedida = {
    id: 0,
    nome: '',
    sigla: '',
    ativo: false
  };

  constructor(
    private unidadeMedidaService: UnidadeMedidaService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router) {      
      route.params.subscribe(p => {
      this.unidadeMedidaId = +p['id'] || 0;
    }); 
  }

  ngOnInit() {         
    if(this.unidadeMedidaId){
      this.unidadeMedidaService.getUnidadeMedida(this.unidadeMedidaId).subscribe(data => {
        this.setUnidadeMedida(data)                
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
      });
    }
  }

  private setUnidadeMedida(u: unidadeMedida) {
    this.unidadeMedida.id = u.id;
    this.unidadeMedida.nome = u.nome;
    this.unidadeMedida.sigla = u.sigla;
    this.unidadeMedida.ativo = u.ativo;
  }

  submit(){
    var result$ = (this.unidadeMedida.id) ? this.unidadeMedidaService.update(this.unidadeMedida.id, this.unidadeMedida) : this.unidadeMedidaService.create(this.unidadeMedida); 
    result$.subscribe(marca => {
      this.toasty.success({
        title: 'Sucesso', 
        msg: 'Unidade de medida adicionada com sucesso.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
      this.router.navigate(['/unidadeMedida']);
    });  
  }

}
