using System.Linq;
using System.Threading.Tasks;
using Estoque.Core.Models;

namespace Estoque.Persistence
{
    public class RelatorioRepository
    {
        private readonly EstoqueDbContext context;
        public RelatorioRepository(EstoqueDbContext context)
        {
            this.context = context;
        }

        public decimal GetValorTotalEstoque()
        {
            return context.Produtos.Sum(x => x.PrecoCusto * x.QuantEstoque);
        }

        // public async Task<Produto> GetValorMedioEstoque()
        // {

        // }
    }
}