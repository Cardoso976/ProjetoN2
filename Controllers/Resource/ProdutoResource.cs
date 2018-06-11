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

        public UnidadeMedidaResource UnidadeMedida { get; set; }

        public MarcaResource Marca { get; set; }              

        public bool Ativo { get; set; }

        public ICollection<ClienteResource> Clientes { get; set; }

        public ProdutoResource()
        {
            Clientes = new Collection<ClienteResource>();
        }        
    }
}