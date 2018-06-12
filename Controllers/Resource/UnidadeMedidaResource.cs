using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Estoque.Controllers.Resource
{
    public class UnidadeMedidaResource
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Sigla { get; set; }

        public bool Ativo { get; set; }
               
    }
}