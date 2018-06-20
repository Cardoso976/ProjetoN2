using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Persistence
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly EstoqueDbContext context;
        public ProdutoRepository(EstoqueDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Produto>> GetProdutos()
        {
            var clientes = await context.Produtos
                .Where(t => t.DataValidade > DateTime.Now)
                .Include(p => p.Marca)
                .Include(p => p.UnidadeMedida)
                .ToListAsync();

            return clientes;
        }

        public async Task<Produto> GetProduto(int id)
        {
            var cliente = await context.Produtos.FindAsync(id);
            return cliente;
        }

        public void Add(Produto produto)
        {
            context.Add(produto);
        }

        public void Delete(Produto produto)
        {
            context.Remove(produto);
        } 
    }
}