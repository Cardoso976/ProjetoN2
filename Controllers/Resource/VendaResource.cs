using System;

namespace Estoque.Controllers.Resource
{
    public class VendaResource
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int ClienteId { get; set; }
        public ClienteResource Cliente { get; set; }
        public ProdutoResource Produto { get; set; }    
        public decimal PrecoPago { get; set; }
        public DateTime DataCompra { get; set; }
        public int QuantidadeProduto { get; set; }
    }
}