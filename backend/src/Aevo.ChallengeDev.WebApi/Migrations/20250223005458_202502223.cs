using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aevo.ChallengeDev.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class _202502223 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "descricao",
                table: "Agendamentos",
                newName: "Descricao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Agendamentos",
                newName: "descricao");
        }
    }
}
