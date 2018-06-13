using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Persistence
{
    public class VendaRepository : IVendaRepository
    {
        private readonly EstoqueDbContext context;
        public VendaRepository(EstoqueDbContext context)
        {
            this.context = context;            
        }

        public async Task<IEnumerable<ProdutoCliente>> GetVendas()
        {
            var vendas = await context.Vendas
                .Include(v => v.Cliente)
                .Include(v => v.Produto)
                    .ThenInclude(p => p.Marca)
                .Include(v => v.Produto)
                    .ThenInclude(p => p.UnidadeMedida)                  
                .ToListAsync();
            return vendas;
        }

        public async Task<ProdutoCliente> GetVenda(int id, int clienteId, int produtoId)
        {            
            return await context.Vendas.FindAsync(id, clienteId, produtoId);
        }

        public void Add(ProdutoCliente venda)
        {
            context.Add(venda);
        }

        public void Delete(ProdutoCliente venda)
        {
            context.Remove(venda);
        }
    }
}