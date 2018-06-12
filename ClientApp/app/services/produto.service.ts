import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoService {

  private readonly produtosEndpoint = '/api/produtos';
  constructor(private http: Http) { }

  getProdutos(){
    return this.http.get(this.produtosEndpoint)
      .map(res => res.json());
  }

  getProduto(id: any){
    return this.http.get(this.produtosEndpoint + '/' + id)
      .map(res => res.json());
  }

  create(produto: any){
    return this.http.post(this.produtosEndpoint, produto)
      .map(res => res.json());
  }

  update(id: any, produto: any){
    return this.http.put(this.produtosEndpoint + '/' + id, produto)
      .map(res => res.json());
  }

  delete(id: any){
    return this.http.delete(this.produtosEndpoint + '/' + id)
      .map(res => res.json());
  }
}
