using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Estoque.Core.Models
{
    public class Cliente
    {
         public int Id { get; set; }

        [Required(ErrorMessage = "Informe o login")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Informe o senha")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "Informe o nome")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Informe o e-mail")]
        public string Email { get; set; }

        public ICollection<ProdutoCliente> Produtos { get; set; }

        public Cliente()
        {
            Produtos = new Collection<ProdutoCliente>();
        }
    }
}