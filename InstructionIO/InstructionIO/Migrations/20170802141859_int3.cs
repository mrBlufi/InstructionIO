using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InstructionIO.Migrations
{
    public partial class int3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelation_Instructions_InstructionId",
                table: "RatingRelation");

            migrationBuilder.DropForeignKey(
                name: "FK_RatingRelation_UserInfos_UserId",
                table: "RatingRelation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RatingRelation",
                table: "RatingRelation");

            migrationBuilder.RenameTable(
                name: "RatingRelation",
                newName: "RatingRelations");

            migrationBuilder.RenameIndex(
                name: "IX_RatingRelation_UserId",
                table: "RatingRelations",
                newName: "IX_RatingRelations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RatingRelation_InstructionId",
                table: "RatingRelations",
                newName: "IX_RatingRelations_InstructionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RatingRelations",
                table: "RatingRelations",
                column: "Id");

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_RatingRelations",
                table: "RatingRelations");

            migrationBuilder.RenameTable(
                name: "RatingRelations",
                newName: "RatingRelation");

            migrationBuilder.RenameIndex(
                name: "IX_RatingRelations_UserId",
                table: "RatingRelation",
                newName: "IX_RatingRelation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RatingRelations_InstructionId",
                table: "RatingRelation",
                newName: "IX_RatingRelation_InstructionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RatingRelation",
                table: "RatingRelation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelation_Instructions_InstructionId",
                table: "RatingRelation",
                column: "InstructionId",
                principalTable: "Instructions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RatingRelation_UserInfos_UserId",
                table: "RatingRelation",
                column: "UserId",
                principalTable: "UserInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
