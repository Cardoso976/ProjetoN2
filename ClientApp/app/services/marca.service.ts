import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class MarcaService {

  private readonly marcasEndpoint = '/api/marcas';
  constructor(private http: Http) { }

  getMarcas(){
    return this.http.get(this.marcasEndpoint)
      .map(res => res.json());
  }

  getMarca(id: any){
    return this.http.get(this.marcasEndpoint + '/' + id)
      .map(res => res.json());
  }

  create(marca: any){
    return this.http.post(this.marcasEndpoint, marca)
      .map(res => res.json());
  }

  update(id: any, marca: any){
    return this.http.put(this.marcasEndpoint+ '/' + id, marca)
      .map(res => res.json());
  }

  delete(id: any){
    return this.http.delete(this.marcasEndpoint + '/' + id)
      .map(res => res.json());
  }

}