using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Persistence
{
    public class UnidadeMedidaRepository : IUnidadeMedidaRepository
    {
        private readonly EstoqueDbContext context;
        public UnidadeMedidaRepository(EstoqueDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<UnidadeMedida>> GetUnidadeMedidas()
        {
            return await context.UnidadeMedidas.ToListAsync();
        }

        public async Task<UnidadeMedida> GetUnidadeMedida(int id)
        {
            return await context.UnidadeMedidas.FindAsync(id);
        }

        public void Add(UnidadeMedida unidadeMedida)
        {
            context.Add(unidadeMedida);
        } 

        public void Remove(UnidadeMedida unidadeMedida)
        {
            context.Remove(unidadeMedida);
        }
    }
}