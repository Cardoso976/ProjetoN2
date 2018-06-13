import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VendaService {

  private readonly vendasEndpoint = '/api/vendas';
  constructor(private http: Http) { }

  getVendas(){
    this.http.get(this.vendasEndpoint)
      .map(res => res.json());
  }

  getVenda(id: any, clienteId: any, produtoId: any){
    this.http.get(this.vendasEndpoint + '&' + id + '&' + clienteId + '&' + produtoId)
      .map(res => res.json());
  }
}
