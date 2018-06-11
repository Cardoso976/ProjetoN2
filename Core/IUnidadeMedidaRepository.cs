using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Core
{
    public interface IUnidadeMedidaRepository
    {
        Task<IEnumerable<UnidadeMedida>> GetUnidadeMedidas();

        Task<UnidadeMedida> GetUnidadeMedida(int id);

        void Add(UnidadeMedida unidadeMedida);

        void Remove(UnidadeMedida unidadeMedida);
    }
}