using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Estoque.Core.Models;

namespace Estoque.Controllers.Resource
{
    public class SaveProdutoResource
    {
        public int Id { get; set; }

        public string Codigo { get; set; }

        public string Nome { get; set; }

        public decimal PrecoCusto { get; set; }

        public decimal PrecoVenda { get; set; }

        public int QuantEstoque { get; set; }

        public DateTime DataValidade { get; set; }  

        public int? UnidadeMedidaId { get; set; }
        public UnidadeMedida UnidadeMedida { get; set; }

        public int? MarcaId { get; set; }
        public Marca Marca { get; set; }

        public DateTime UltimaModificacao { get; set; }

        public ICollection<ProdutoCliente> Clientes { get; set; }

        public SaveProdutoResource()
        {
            Clientes = new Collection<ProdutoCliente>();
        }

    }
}