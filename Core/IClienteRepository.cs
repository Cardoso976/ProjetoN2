using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Core
{
    public interface IClienteRepository
    {
         Task<IEnumerable<Cliente>> GetClientes();

         Task<Cliente> GetCliente(int id);

         void Add(Cliente cliente);

         void Delete(Cliente cliente);
    }
}