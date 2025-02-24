using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aevo.ChallengeDev.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class _202502222 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_SalaId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_UsuarioId",
                table: "Agendamentos");

            migrationBuilder.AddColumn<string>(
                name: "descricao",
                table: "Agendamentos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "descricao",
                table: "Agendamentos");

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_SalaId",
                table: "Agendamentos",
                column: "SalaId");

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_UsuarioId",
                table: "Agendamentos",
                column: "UsuarioId");
        }
    }
}
