import { MarcaService } from './../../services/marca.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-view-marca',
  templateUrl: './view-marca.component.html',
  styleUrls: ['./view-marca.component.css']
})
export class ViewMarcaComponent implements OnInit {
  marca : any;
  marcaId: number = 0;

  constructor(
    private marcaService : MarcaService,
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService) { 
    route.params.subscribe(p => {
      this.marcaId = +p['id'];
      if (isNaN(this.marcaId) || this.marcaId <= 0) {
        router.navigate(['/marcas']);
        return; 
      }
    });
   }

   ngOnInit() {     
    this.marcaService.getMarca(this.marcaId)
      .subscribe(
        m => this.marca = m,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.marcaService.delete(this.marca.id)
        .subscribe(x => {
          this.toasty.success({
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
}
