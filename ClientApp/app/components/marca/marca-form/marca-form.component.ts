import { ToastyService } from 'ng2-toasty';
import { marca } from './../../../models/marca';
import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {
  marcaId : any;
  marca: marca = {
    id: 0,
    nome: '',
    ativo: false
  };

  constructor(
    private marcaService: MarcaService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,) { 

      route.params.subscribe(p => {
        this.marcaId = +p['id'] || 0;
      });
     }

  ngOnInit() {     
    if(this.marcaId){
      this.marcaService.getMarca(this.marcaId).subscribe(data => {
        this.setMarca(data)                
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
      });
    }
  }
  
  private setMarca(m: marca) {
    this.marca.id = m.id;
    this.marca.nome = m.nome;
    this.marca.ativo = m.ativo;
  } 

  submit(){
    console.log("MARCA", this.marca);
    var result$ = (this.marca.id) ? this.marcaService.update(this.marca.id, this.marca) : this.marcaService.create(this.marca); 
    result$.subscribe(marca => {
      this.toastyService.success({
        title: 'Sucesso', 
        msg: 'Marca adicionada com sucesso.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
      this.router.navigate(['/marcas']);
    });    
  }
}
