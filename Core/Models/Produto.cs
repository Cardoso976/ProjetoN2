using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Estoque.Core.Models
{
    public class Produto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Preencha o código.")]
        [MaxLength(10, ErrorMessage = "O código pode ter no máximo 10 caracteres.")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "Preencha o nome.")]
        [MaxLength(50, ErrorMessage = "O nome pode ter no máximo 50 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Preencha o preço de custo.")]
        [Column(TypeName = "decimal(6, 2)")]
        public decimal PrecoCusto { get; set; }

        [Required(ErrorMessage = "Preencha o preço de venda.")]
        [Column(TypeName = "decimal(6, 2)")]
        public decimal PrecoVenda { get; set; }

        [Required(ErrorMessage = "Preencha a quantidade em estoque.")]
        public int QuantEstoque { get; set; }

        public DateTime DataValidade { get; set; }        

        public int? UnidadeMedidaId { get; set; }
        public UnidadeMedida UnidadeMedida { get; set; }

        public int? MarcaId { get; set; }
        public Marca Marca { get; set; }              

        public DateTime UltimaModificacao { get; set; }

        public ICollection<ProdutoCliente> Clientes { get; set; }

        public Produto()
        {
            Clientes = new Collection<ProdutoCliente>();
        }

    }
}