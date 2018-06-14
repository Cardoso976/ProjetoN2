import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VendaService {

  private readonly vendasEndpoint = '/api/vendas';
  constructor(private http: Http) { }

  getVendas(){
    return this.http.get(this.vendasEndpoint)
      .map(res => res.json());
  }

  getVenda(id: any, clienteId: any, produtoId: any){
    return this.http.get(this.vendasEndpoint + '/' + id + '&' + clienteId + '&' + produtoId)
      .map(res => res.json());
  }

  create(venda: any){
    return this.http.post(this.vendasEndpoint, venda)
      .map(res => res.json());
  }

  delete(id: any, clienteId: any, produtoId: any){
    return this.http.delete(this.vendasEndpoint+'/'+ id + '&' + clienteId + '&' + produtoId)
      .map(res => res.json());
  }
}
