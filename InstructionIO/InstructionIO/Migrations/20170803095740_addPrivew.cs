using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InstructionIO.Migrations
{
    public partial class addPrivew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreviewImage",
                table: "Instructions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreviewText",
                table: "Instructions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviewImage",
                table: "Instructions");

            migrationBuilder.DropColumn(
                name: "PreviewText",
                table: "Instructions");
        }
    }
}
