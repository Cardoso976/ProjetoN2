using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Estoque.Core.Models
{
    public class Marca
    {        
        public int Id { get; set; }

        [Required(ErrorMessage = "Preencha o nome.")]
        public string Nome { get; set; }

        public bool Ativo{ get; set; }

        public ICollection<Produto> Produtos { get; set; }

        public Marca()
        {
            Produtos = new Collection<Produto>();
        }       
    }
}