using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineSeat.Server.Migrations
{
    /// <inheritdoc />
    public partial class RenombrarAsientoReservadoAAsiento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "AsientosReservados",
                newName: "Asientos");

            migrationBuilder.RenameIndex(
                name: "PK_AsientosReservados",
                table: "Asientos",
                newName: "PK_Asientos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "PK_Asientos",
                table: "AsientosReservados",
                newName: "PK_AsientosReservados");

            migrationBuilder.RenameTable(
                name: "Asientos",
                newName: "AsientosReservados");
        }
    }
}
