using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Estoque.Migrations
{
    public partial class Id_ProdutoId_ClienteId_PK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendas",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "VendaId",
                table: "Vendas");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Vendas",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendas",
                table: "Vendas",
                columns: new[] { "Id", "ClienteId", "ProdutoId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendas",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Vendas");

            migrationBuilder.AddColumn<int>(
                name: "VendaId",
                table: "Vendas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendas",
                table: "Vendas",
                columns: new[] { "VendaId", "ClienteId", "ProdutoId" });
        }
    }
}
