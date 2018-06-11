using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Estoque.Core.Models;

namespace Estoque.Controllers.Resource
{
    public class ClienteResource
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string RazaoSocial { get; set; }

        public string NumDocumento { get; set; }

        public int TipoPessoa { get; set; }

        public string Telefone { get; set; }

        public string Contato { get; set; }

        public string Logradouro { get; set; }

        public string Numero { get; set; }

        public string Complemento { get; set; }

        public string Cep { get; set; }

        public string Pais { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public DateTime UltimaModificacao { get; set; }  

        public ICollection<ProdutoResource> Produtos { get; set; }

        public ClienteResource()
        {
            Produtos = new Collection<ProdutoResource>();
        }        
    }
}