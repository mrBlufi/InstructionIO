using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InstructionIO.Migrations
{
    public partial class test0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TagsRelations_Instructions_InstructionId",
                table: "TagsRelations");

            migrationBuilder.DropForeignKey(
                name: "FK_TagsRelations_Tags_TagId",
                table: "TagsRelations");

            migrationBuilder.AlterColumn<int>(
                name: "TagId",
                table: "TagsRelations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "TagsRelations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_TagsRelations_Instructions_InstructionId",
                table: "TagsRelations",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TagsRelations_Tags_TagId",
                table: "TagsRelations",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TagsRelations_Instructions_InstructionId",
                table: "TagsRelations");

            migrationBuilder.DropForeignKey(
                name: "FK_TagsRelations_Tags_TagId",
                table: "TagsRelations");

            migrationBuilder.AlterColumn<int>(
                name: "TagId",
                table: "TagsRelations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "TagsRelations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TagsRelations_Instructions_InstructionId",
                table: "TagsRelations",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagsRelations_Tags_TagId",
                table: "TagsRelations",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
