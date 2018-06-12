using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Estoque.Migrations
{
    public partial class ProdutoDataModificacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Produtos");

            migrationBuilder.AddColumn<DateTime>(
                name: "UltimaModificacao",
                table: "Produtos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UltimaModificacao",
                table: "Produtos");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Produtos",
                nullable: false,
                defaultValue: false);
        }
    }
}
