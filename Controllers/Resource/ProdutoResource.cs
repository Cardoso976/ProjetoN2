using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Estoque.Controllers.Resource
{
    public class ProdutoResource
    {
        public int Id { get; set; }

        public string Codigo { get; set; }

        public string Nome { get; set; }

        public decimal PrecoCusto { get; set; }

        public decimal PrecoVenda { get; set; }

        public int QuantEstoque { get; set; }

        public DateTime DataValidade { get; set; }  
        
        public int? UnidadeMedidaId { get; set; }
        public UnidadeMedidaResource UnidadeMedida { get; set; }

        public int? MarcaId { get; set; }
        public MarcaResource Marca { get; set; }              

        public DateTime UltimaModificacao { get; set; }
                      
    }
}