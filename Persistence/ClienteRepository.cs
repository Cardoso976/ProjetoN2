using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Persistence
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly EstoqueDbContext context;
        public ClienteRepository(EstoqueDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Cliente>> GetClientes()
        {
            return await context.Clientes.ToListAsync();
        }

        public async Task<Cliente> GetCliente(int id)
        {
            return await context.Clientes.FindAsync(id);
        }

        public void Add(Cliente cliente)
        {
            context.Add(cliente);
        }

        public void Delete(Cliente cliente)
        {
            context.Remove(cliente);
        }
    }
}