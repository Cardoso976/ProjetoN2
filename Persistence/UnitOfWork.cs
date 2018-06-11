using System.Threading.Tasks;
using Estoque.Core;

namespace Estoque.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EstoqueDbContext context;
        public UnitOfWork(EstoqueDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        { 
            await context.SaveChangesAsync();
        }
    }
}