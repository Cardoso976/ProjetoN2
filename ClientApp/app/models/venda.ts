import { cliente } from './venda';
import { produto } from './venda';
import { marca } from './marca';
import { unidadeMedida } from './unidade-medida';

export interface vendaSalvar {
    produtoId: number,
    clienteId: number,
    quantidadeProduto: number
};

export interface venda {    
    id: number,
    produtoId: number,
    cliente: cliente,
    produto: produto,
    clienteId: number,
    precoPago: number,
    quantidadeProduto: number,
    dataCompra: string
};

export interface cliente{     
    id: number,
    nome: string,
    razaoSocial: string,
    numDocumento: string,
    tipoPessoa: false,
    telefone: string,
    contato: string,
    logradouro: string, 
    numero: string,
    complemento: string,
    cep: string,
    pais: string,
    estado: string,
    cidade: string      
}

export interface produto {  
    id: number,
    codigo: string,
    nome: string,
    precoCusto: number,
    precoVenda: number,
    quantEstoque: number,
    unidadeMedidaId: number,
    unidadeMedida: unidadeMedida,
    marcaId: number
    marca: marca
}