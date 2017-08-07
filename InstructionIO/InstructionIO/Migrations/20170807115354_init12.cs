using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InstructionIO.Migrations
{
    public partial class init12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelations_Instructions_InstructionId",
                table: "RatingRelations");

            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelations_UserInfos_UserId",
                table: "RatingRelations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "RatingRelations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "RatingRelations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelations_Instructions_InstructionId",
                table: "RatingRelations",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelations_UserInfos_UserId",
                table: "RatingRelations",
                column: "UserId",
                principalTable: "UserInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelations_Instructions_InstructionId",
                table: "RatingRelations");

            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelations_UserInfos_UserId",
                table: "RatingRelations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "RatingRelations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "RatingRelations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelations_Instructions_InstructionId",
                table: "RatingRelations",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelations_UserInfos_UserId",
                table: "RatingRelations",
                column: "UserId",
                principalTable: "UserInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
