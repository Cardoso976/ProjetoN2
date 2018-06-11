using System.Threading.Tasks;

namespace Estoque.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}