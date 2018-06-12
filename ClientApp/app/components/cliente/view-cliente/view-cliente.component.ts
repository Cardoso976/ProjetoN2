import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.css']
})
export class ViewClienteComponent implements OnInit {
  clienteId = 0;
  cliente: any;

  constructor(    
    private clienteService : ClienteService,
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService) { 
    route.params.subscribe(p => {
      this.clienteId = +p['id'];
      if (isNaN(this.clienteId) || this.clienteId <= 0) {
        router.navigate(['/clientes']);
        return; 
      }
    });
  }

  ngOnInit() {
    if (this.clienteId){
      this.clienteService.getCliente(this.clienteId).subscribe(data => {
        this.cliente = data;
      }, err => {
        if (err.status == 404){
          this.router.navigate(['/clientes']);
        }
      });
    }
  }

  delete(){
    if (confirm("Tem certeza que deseja excluir o cliente?")) {
      this.clienteService.delete(this.cliente.id)
        .subscribe(x => {
          this.toasty.warning({
            title: 'Sucesso', 
            msg: 'Cliente excluido com sucesso.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 2000
          });
          this.router.navigate(['/clientes']);
        });
    }
  }

}
