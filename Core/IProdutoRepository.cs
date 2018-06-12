using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Core
{
    public interface IProdutoRepository
    {
         Task<IEnumerable<Produto>> GetProdutos();

         Task<Produto> GetProduto(int id);

         void Add(Produto produto);

         void Delete(Produto produto);
    }
}