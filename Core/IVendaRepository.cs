using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Core
{
    public interface IVendaRepository
    {
        Task<IEnumerable<ProdutoCliente>> GetVendas();

        Task<ProdutoCliente> GetVenda(int clienteId, int produtoId);

    }
}