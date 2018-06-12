import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService {

  private readonly marcasEndpoint = '/api/clientes';
  constructor(private http: Http) { }

  getClientes(){
    return this.http.get(this.marcasEndpoint)
      .map(res => res.json());
  }

  getCliente(id: any){
    return this.http.get(this.marcasEndpoint + '/' + id)
      .map(res => res.json());
  }

  update(id: any, cliente: any){
    return this.http.put(this.marcasEndpoint + '/' + id, cliente);
  }

  create(cliente: any){
    return this.http.post(this.marcasEndpoint, cliente)
      .map(res => res.json());
  }

  delete(id: any){
    return this.http.delete(this.marcasEndpoint + '/' + id)
      .map(res => res.json());
  }
}
