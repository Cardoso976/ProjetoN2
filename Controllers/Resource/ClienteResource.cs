using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Estoque.Core.Models;

namespace Estoque.Controllers.Resource
{
    public class ClienteResource
    {
        public int Id { get; set; }
        
        public string Login { get; set; }
        
        public string Senha { get; set; }
        
        public string Nome { get; set; }
        
        public string Email { get; set; }

        public ICollection<ProdutoResource> Produtos { get; set; }

        public ClienteResource()
        {
            Produtos = new Collection<ProdutoResource>();
        }        
    }
}