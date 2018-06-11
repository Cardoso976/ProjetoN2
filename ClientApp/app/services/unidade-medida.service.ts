import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UnidadeMedidaService {

  private readonly unidadeMedidasEndpoint = '/api/unidadeMedidas';
  constructor(private http: Http) { }

  getUnidadeMedidas(){
    return this.http.get(this.unidadeMedidasEndpoint)
      .map(res => res.json());
  }

  getUnidadeMedida(id: any){
    return this.http.get(this.unidadeMedidasEndpoint + '/' + id)
      .map(res => res.json());
  }

  create(unidadeMedida : any){
    return this.http.post(this.unidadeMedidasEndpoint, unidadeMedida)
      .map(res => res.json());
  }

  update(id: any, unidadeMedida: any){
    return this.http.put(this.unidadeMedidasEndpoint + '/' + id, unidadeMedida)
      .map(res => res.json());
  }

  delete(id: any){
    return this.http.delete(this.unidadeMedidasEndpoint + '/' + id)
      .map(res => res.json());
  }
}
