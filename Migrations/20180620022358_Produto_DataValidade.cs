using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Estoque.Migrations
{
    public partial class Produto_DataValidade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataValidade",
                table: "Produtos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataValidade",
                table: "Produtos");
        }
    }
}
