using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Core
{
    public interface IMarcaRepository
    {
        Task<IEnumerable<Marca>> GetMarcas();

        Task<Marca> GetMarca(int id);
        
        void Add(Marca marca);

        void Remove(Marca marca);
    }
}