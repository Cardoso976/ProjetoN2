using Estoque.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Persistence
{
    public class EstoqueDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<UnidadeMedida> UnidadeMedidas { get; set; }

        public DbSet<ProdutoCliente> Vendas { get; set; }       

        public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options)
         : base (options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProdutoCliente>()
                .HasKey(t => new { t.ClienteId, t.ProdutoId });
        }        
    }
}