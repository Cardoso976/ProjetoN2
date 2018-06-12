using Microsoft.EntityFrameworkCore.Migrations;

namespace Estoque.Migrations
{
    public partial class ClienteTipoPessoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "TipoPessoa",
                table: "Clientes",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TipoPessoa",
                table: "Clientes",
                nullable: false,
                oldClrType: typeof(bool));
        }
    }
}
