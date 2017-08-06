using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InstructionIO.Migrations
{
    public partial class backtonormal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Instructions_InstructionId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_InstructionId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "InstructionId",
                table: "Tags");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InstructionId",
                table: "Tags",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_InstructionId",
                table: "Tags",
                column: "InstructionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Instructions_InstructionId",
                table: "Tags",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
