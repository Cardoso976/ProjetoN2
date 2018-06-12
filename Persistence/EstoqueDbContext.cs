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

        public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options)
         : base (options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProdutoCliente>()
                .HasKey(t => new { t.ClienteId, t.ProdutoId });

            modelBuilder.Entity<ProdutoCliente>()
                .HasOne(pt => pt.Cliente)
                .WithMany(p => p.Produtos)
                .HasForeignKey(pt => pt.ClienteId);

            modelBuilder.Entity<ProdutoCliente>()
                .HasOne(pt => pt.Produto)
                .WithMany(t => t.Clientes)
                .HasForeignKey(pt => pt.ProdutoId);
        }        
    }
}